import React from "react";
import Main from "../../layout/main";
import Container from "../../components/ui/container";
import SetTitle from "../../components/set-title";

const License: React.FC = () => {
  return (
    <Main>
      <SetTitle title={`License`} />
      <Container>
        <div className="my-10">
          <h1 className="my-2">Licensing Information</h1>

          <p>
            Welcome to Hotel Haven, a hotel booking service located in Dhaka,
            Bangladesh. Here, we provide information about the licensing and
            registration of our business.
          </p>

          <h2 className="my-2">Business Information</h2>

          <p>
            <strong>Business Name:</strong> Hotel Haven
          </p>
          <p>
            <strong>Email:</strong> hotelhaven@gmail.com
          </p>
          <p>
            <strong>Location:</strong> Dhaka, Bangladesh
          </p>

          <h2 className="my-2">Licensing and Registration</h2>

          <p>
            Hotel Haven is a legally registered and licensed business in Dhaka,
            Bangladesh. We adhere to all relevant regulations and requirements
            as set forth by the local authorities.
          </p>
        </div>
      </Container>
    </Main>
  );
};

export default License;