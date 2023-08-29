import { FC, useState, useEffect } from "react";
import { Layout, Space, Breadcrumb, Card, Button } from "antd";
import { getArticles } from "../../api";
import ModalDetail from "./detail";
import { uid } from "uid";

const headerStyle: React.CSSProperties = {
  color: "#000",
  height: 50,
  paddingInline: 50,
  lineHeight: "50px",
  backgroundColor: "#eee",
  paddingLeft: 50,
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "auto",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#fff",
  marginTop: "10px",
  padding: 10,
};

const Home: FC = () => {
  const { Meta } = Card;
  const { Header, Content } = Layout;
  const [data, setData] = useState<any>([]);
  const [isId, setIsId] = useState<any>();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    getArticles()
      .then(({ data }) => {
        const { articles } = data || {};
        setData(articles);
      })
      .catch(() => "");
  }, []);

  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
        <Layout>
          <Header style={headerStyle}>
            <h1>News Articles</h1>
          </Header>
          <Content style={contentStyle}>
            <div
              className="breadcrumb-section"
              style={{
                marginLeft: 30,
                width: "30rem",
                paddingLeft: 10,
              }}
            >
              <Breadcrumb
                items={[
                  {
                    title: "Home",
                  },
                  {
                    title: <a href="">News</a>,
                  },
                  {
                    title: <a href="">News Update</a>,
                  },
                  {
                    title: "News List",
                  },
                ]}
                style={{ backgroundColor: "#fff" }}
              />
            </div>

            <div
              className="card-section"
              style={{
                display: "flex",
                width: "auto",
                marginTop: 30,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {Array.isArray(data) &&
                data?.map((item: any, i: number) => {
                  item.id = i + 1;

                  return (
                    <Card
                      hoverable
                      style={{ width: "25rem", margin: "7px" }}
                      cover={
                        <img
                          alt="example"
                          src={
                            item?.urlToImage || "https://placehold.co/600x400"
                          }
                        />
                      }
                    >
                      <Meta
                        title={item?.title}
                        description={item?.content || item?.description}
                      />
                      <Button
                        key="back"
                        onClick={() => {
                          setIsId(item.id);
                          setShowModal(true);
                        }}
                        style={{
                          marginTop: 10,
                          backgroundColor: "#597ef7",
                          color: "#fff",
                        }}
                      >
                        See Detail
                      </Button>
                    </Card>
                  );
                })}
            </div>
          </Content>
        </Layout>
      </Space>

      <ModalDetail
        setShowModal={setShowModal}
        showModal={showModal}
        isId={isId}
      />
    </>
  );
};

export default Home;
