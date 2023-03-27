import { useEffect, useState } from "react";
import { Col, Card, Row, Button } from "react-bootstrap";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const { articles } = await response.json();
      console.log(articles);
      const filteredData = articles.filter(
        (current) => current.urlToImage !== null
      );
      console.log("filtered Data", filteredData);
      console.log(process.env.REACT_APP_API_KEY);
      setData(filteredData);
    };
    fetchNews();
  }, []);

  return (
    <div>
      <h2 className="text-center">React News App</h2>
      <div className="border border-success my-4 border-2"></div>
      <div className="py-5">
        <Row xs={1} md={3} className="g-4">
          {data.map((currentNews, index) => (
              <Col>
                <Card style={{ height: "40rem" }}>
                  <Card.Img
                    variant="top"
                    src={currentNews.urlToImage}
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{currentNews.source.name}</Card.Title>
                    <Card.Text>{currentNews.title}</Card.Text>
                    <Button variant="success" href={currentNews.url} target="_blank">Detail</Button>
                  </Card.Body>
                </Card>
              </Col>
            
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
