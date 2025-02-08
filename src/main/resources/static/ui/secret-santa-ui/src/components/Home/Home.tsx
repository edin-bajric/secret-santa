import useReceiver from "../../hooks/useReceiver";

const Home = () => {
  const { data: receiver, isLoading, error } = useReceiver();

  if (isLoading) {
    return <div>Loading receiver details...</div>;
  }

  if (error) return <p>{error.message}</p>;

  return (
    <div className="d-flex align-items-center justify-content-center flex-column vh-100 text-center">
      <h1>Welcome to Secret Santa</h1>
      {receiver ? (
        <div>
          <p>Your gift receiver is:</p>
          <p>
            <strong>
              {receiver.name} {receiver.surname}
            </strong>
          </p>
        </div>
      ) : (
        <p>You do not have a receiver assigned yet.</p>
      )}
    </div>
  );
};

export default Home;
