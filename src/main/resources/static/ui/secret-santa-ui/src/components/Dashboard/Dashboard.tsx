import { Button, Spinner, Alert, ListGroup } from "react-bootstrap";
import useGeneratePairs from "../../hooks/useGeneratePairs";
import useGetAllPairs from "../../hooks/useGetAllPairs";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { mutate, isPending, isSuccess, isError, error } = useGeneratePairs();
  const { data: pairs, refetch: refetchPairs } = useGetAllPairs();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleGeneratePairs = () => {
    mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessAlert(true);
      refetchPairs();
      const timer = setTimeout(() => setShowSuccessAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, refetchPairs]);

  useEffect(() => {
    if (isError) {
      setShowErrorAlert(true);
      const timer = setTimeout(() => setShowErrorAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      {showSuccessAlert && (
        <Alert
          variant="success"
          onClose={() => setShowSuccessAlert(false)}
          dismissible
        >
          Pairs generated successfully!
        </Alert>
      )}

      {showErrorAlert && (
        <Alert
          variant="danger"
          onClose={() => setShowErrorAlert(false)}
          dismissible
        >
          Error:{" "}
          {error instanceof Error ? error.message : "Something went wrong"}
        </Alert>
      )}

      <Button
        variant="primary"
        onClick={handleGeneratePairs}
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Spinner animation="border" size="sm" /> Generating...
          </>
        ) : (
          "Generate Pairs"
        )}
      </Button>

      {pairs && pairs.length > 0 && (
        <ListGroup className="mt-4">
          <ListGroup.Item variant="info" className="text-center">
            <strong>Generated Pairs</strong>
          </ListGroup.Item>
          {pairs.map((pair, index) => (
            <ListGroup.Item key={index}>
              <strong>Giver:</strong> {pair.giver} <br />
              <strong>Receiver:</strong> {pair.receiver}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default Dashboard;
