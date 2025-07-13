import { Modal } from "../components/Modal";
import { Button } from "../components/Button";
import { BackIcon } from "../assets/icons";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext, useModalContext } from "../hooks/hooks";
import { ObjectId } from "bson";
import axios from "axios";
import { ContentContext, ShareContext } from "../contexts/contexts";
import { Loader } from "../assets/loader";

export const Content = ({ variant }: { variant?: "shared" }) => {
  const { id, contentId } = useParams();
  const cardId = variant === "shared" ? contentId : id;
  const ContentCtx = useContext(ContentContext);
  const ShareCtx = useContext(ShareContext);

  document.title = variant == "shared" ? "Shared Content" : "Content";

  const { setDeleteModal, setModal } = useModalContext();
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const key = import.meta.env.VITE_EMBED_KEY;
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const contentToRender = ShareCtx
    ? ShareCtx!.shareContent
    : ContentCtx?.rootContent;

  if (contentToRender === undefined) {
    throw Error("null contentToRender");
  }
  const card = contentToRender.find((item) => item._id === cardId);

  const [imgsrc, setImg] = useState("");
  const timestamp = new ObjectId(card?._id).getTimestamp();
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (!card) return;
    setImageLoading(true);
    fetch("https://api.linkpreview.net", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Linkpreview-Api-Key": key,
      },
      body: new URLSearchParams({
        q: card.link,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setImg(data.image);
        setImageLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setImageLoading(false);
      });
  }, [card]);

  const deleteContent = async () => {
    await axios.delete(backend_url + "content/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDeleteModal(false);
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col tab:ml-[377px] flex-1 -space-y-7 mt-[60px] tab:mt-0">
        <div className="flex w-full justify-start items-center pl-[5px] tab:pl-[40px] bg-bd-silver h-[160px]">
          <Button
            variant="secondary"
            size="s-ico"
            startIcon={<BackIcon size="md" />}
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="flex justify-between pl-[40px] tab:pl-[100px] tab:pr-[40px]">
          <p className="text-white text-[40px] tab:text-[48px] font-semibold -mt-1 tab:-mt-2 ">
            {card?.title}
          </p>
          {variant != "shared" && (
            <div className="flex gap-[10px]">
              <Button
                variant="secondary"
                size="s-md"
                text="Edit"
                onClick={() => setModal(true)}
              />
              <Button
                variant="secondary"
                size="s-md"
                text="Delete"
                onClick={() => setDeleteModal(true)}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col mt-10 pl-[30px] tab:pl-[100px] text-white">
          <div className="flex mt-6 tab:mt-10 bg-bd-silver w-[370px] tab:w-[450px] h-[220px] tab:h-[280px] rounded-[10px] justify-center items-center">
            {imageLoading ? (
              <div className="flex justify-center items-center h-48">
                <Loader />
              </div>
            ) : (
              <img
                className="w-[315px] tab:w-[380px] h-[160px] tab:h-[200px] object-cover rounded-[10px] cursor-pointer"
                src={imgsrc}
                alt="broken"
                onClick={() =>
                  window.open(card?.link, "_blank", "noopener,noreferrer")
                }
              />
            )}
          </div>
          <div className="flex justify-start mt-[50px] gap-[10px] items-center">
            <p className="text-white font-semibold text-[20px] tab:text-[25px]">
              Tags
            </p>
            <div className="flex gap-[10px]">
              {card?.tags.map((c) => (
                <Button
                  variant="secondary"
                  size="s-xs"
                  pointeroff={true}
                  text={"# " + c?.title}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-start mt-[30px] gap-[10px] items-center">
            <p className="text-white font-semibold text-[20px] tab:text-[25px]">
              Created On
            </p>
            <div>
              <Button
                variant="secondary"
                size="s-xs"
                text={timestamp.toISOString()}
              />
            </div>
          </div>
          <div className="flex justify-start my-[30px] gap-[10px] items-center">
            <p className="text-white font-semibold text-[20px] tab:text-[25px]">
              Created By
            </p>
            <div>
              <Button
                variant="secondary"
                size="s-xs"
                text={"@" + card?.userid.username}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal variant="settings" />
      {variant != "shared" && (
        <Modal variant="delete" onSubmit={deleteContent} />
      )}
      {variant != "shared" && (
        <Modal variant="content" edit={true} contentId={id} />
      )}
    </>
  );
};
