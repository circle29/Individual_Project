import { Container } from "@chakra-ui/react";
import { Carousel } from "react-bootstrap";

export const Heroes = () => {
    return (
        <div>
            <Container
                maxW="container.xl"
                borderRadius="lg"
                className="pt-2 carousel-home"
            >
                <Carousel className="carousel-home">
                    <Carousel.Item interval={4000}>
                        <img
                            className="d-block w-100 rounded-4"
                            src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2022/11/8/dee2ede1-2ab3-430e-9bff-fa826996eeae.jpg.webp?ect=4g"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={4000}>
                        <img
                            className="d-block w-100 rounded-4"
                            src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2022/11/8/6f1140a6-6d17-437e-aeee-c87fe2a5dc9e.jpg?ect=4g"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={4000}>
                        <img
                            className="d-block w-100 rounded-4"
                            src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2022/11/7/2e00e748-fcaf-4dda-a9c4-5549798f6d2e.jpg.webp?ect=4g"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </Container>
        </div>
    );
};
