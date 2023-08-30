/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { getArticles } from "../../api";
import { Link } from "react-router-dom";
import moment from "moment";

type Props = {
  showModal: any;
  setShowModal: any;
  isId: any;
};

const ModalDetail: FC<Props> = ({ showModal, setShowModal, isId }) => {
  const [detail, setDetail] = useState([]);
  const handleCancel = () => {
    setShowModal(false);
  };

  const handleOk = () => {
    setTimeout(() => {
      showModal(false);
    }, 3000);
  };

  useEffect(() => {
    if (isId) {
      getArticles()
        .then(({ data }) => {
          const { articles } = data || {};
          const res = articles.map((item: any, i: number) => {
            return {
              id: (item.id = i + 1),
              author: item?.author,
              title: item?.title,
              description: item?.description,
              toImg: item?.urlToImage,
              url: item?.url,
              publisAt: item?.publishedAt,
              content: item?.content,
            };
          });
          setDetail(res);
        })
        .catch(() => "");
    }
  }, [isId]);

  return (
    <Modal
      open={showModal}
      title="Detail"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button
          key="back"
          style={{ backgroundColor: "#d9d9d9" }}
          onClick={handleCancel}
        >
          Close
        </Button>,
      ]}
    >
      {detail
        ?.filter((item: any) => item?.id === isId)
        ?.map((c: any, i: number) => (
          <>
            <div key={i} className="detail-top">
              <div className="">
                <img
                  src={c?.toImg || "https://placehold.co/600x400"}
                  alt="image-articler"
                  width={135}
                />
              </div>
              <div className="author-class">
                <label>Author : </label>
                <span>{c?.author || "-"}</span>
              </div>
            </div>

            <div className="detail-middle">
              <div className="title-class">
                <label>Title : </label>
                <span>{c?.title || "-"}</span>
              </div>

              <div className="description-class">
                <label>Description : </label>
                <span>{c?.description || "-"}</span>
              </div>

              <div className="content-class">
                <label>Content : </label>
                <span>{c?.content || "-"}</span>
              </div>

              <div className="url-class">
                <label>Url Reference : </label>
                <Link to={c?.url} target="_blank">
                  {c?.url}
                </Link>
              </div>

              <div className="publish-class">
                <label>Publish At : </label>
                <span>{moment(c?.publisAt).format("LL")}</span>
              </div>
            </div>
          </>
        ))}
    </Modal>
  );
};

export default ModalDetail;
