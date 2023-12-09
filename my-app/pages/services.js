import { useState } from "react";
import Layout from "../components/Layout";
import Modal from "react-modal";

function Services() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Plumbing",
      description: "Professional plumbing services for your home.",
    },
    {
      id: 2,
      name: "Electrician",
      description: "Electrical services to meet your needs.",
    },
    {
        id: 3,
        name: "Doctor and Ambulance",
        description: "Avail Health Benefits on the go",
      },
      {
        id: 4,
        name: "Cleaning",
        description: "Schedule to clean your flat at reasonal price",
      },
      {
        id: 5,
        name: "Chef \/ Delivery",
        description: "Get your food from nearest store or made by chef",
      },
      {
        id: 6,
        name: "Book Airport Cab",
        description: "Easy booking of Airport cans without any issues",
      }
  ]);

  return (
    <Layout title="Services">
      <div className="p-4 bg-slate-800">
        <div className="text-center text-4xl font-bold mb-6 text-white animate__animated animate__fadeIn">
          Explore Services
        </div>

        <main>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-3">
            {services.map((service) => (
              <CustomCard
                key={service.id}
                title={service.name}
                description={service.description}
              />
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
}

// Custom Card Component
const CustomCard = ({ title, description }) => {
    const [isScheduled, setIsScheduled] = useState(false);
    const [isCallInitiated, setIsCallInitiated] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
  
    const scheduleService = () => {
      setIsScheduled(true);
      setModalIsOpen(true);
      console.log(`Scheduled service for ${title}`);
    };
  
    const callService = () => {
      setIsCallInitiated(true);
      setModalIsOpen(true);
      console.log(`Calling service for ${title}`);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
  
    return (
      <div className="max-w-sm bg-gradient-to-b from-blue-900 to-black rounded-lg border border-gray-200 shadow-md">
        <div className="px-3 h-30">
          <p className="text-base">{description}</p>
        </div>
        <div className="pt-4 mb-5 flex justify-center items-center">
          <button
            className={`p-1 w-24 items-center text-gray-50 text-sm bg-gradient-to-r from-indigo-900 to-violet-600 rounded-md shadow-lg ${
              isScheduled ? "bg-green-500" : ""
            }`}
            onClick={scheduleService}
            disabled={isScheduled}
          >
            {isScheduled ? "Scheduled" : "Schedule"}
          </button>
          <button
            className={`p-1 w-24 items-center text-gray-50 text-sm bg-gradient-to-r from-indigo-900 to-violet-600 rounded-md shadow-lg ${
              isCallInitiated ? "bg-green-500" : ""
            }`}
            onClick={callService}
            disabled={isCallInitiated}
          >
            {isCallInitiated ? "6377288971" : "Call"}
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Service Popup"
          style={{
            content: {
              width: "300px", // Set the width as needed
              height:"200px",
              margin: "auto",
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "20px",
              textAlign: "center",
            },
          }}
        >
          <h2>Scheduled service for {title}</h2>
          <br/>
          <button onClick={closeModal}><b>Close</b></button>
        </Modal>
      </div>
    );
  };
  
  export default Services;