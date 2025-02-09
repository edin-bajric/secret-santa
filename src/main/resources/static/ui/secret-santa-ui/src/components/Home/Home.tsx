import useReceiver from "../../hooks/useReceiver";

const Home = () => {
  const { data: receiver, isLoading, error } = useReceiver();

  if (isLoading) {
    return <div>Loading receiver details...</div>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="d-flex align-items-center justify-content-center flex-column vh-100 text-center">
      <h1>Welcome to Secret Santa</h1>
      {receiver && receiver.name && receiver.surname ? (
        <div>
          <p>Your gift recipient is:</p>
          <p>
            <h3>
              {receiver.name} {receiver.surname}
            </h3>
          </p>
        </div>
      ) : (
        <p>You do not have a gift receiver assigned yet.</p>
      )}
    </div>
  );
};

export default Home;
