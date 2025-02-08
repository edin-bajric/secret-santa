import { Button, Spinner, Alert, ListGroup } from "react-bootstrap";
import useGeneratePairs from "../../hooks/useGeneratePairs";
import useGetAllPairs from "../../hooks/useGetAllPairs";
import useGetEmployeesWithoutPairs from "../../hooks/useGetEmployeesWithoutPairs";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { mutate, isPending, isSuccess, isError, error } = useGeneratePairs();
  const {
    data: pairs,
    isLoading: isPairsLoading,
    isError: isPairsError,
    error: pairsError,
  } = useGetAllPairs();
  const {
    data: employeesWithoutPairs,
    isLoading: isEmployeesLoading,
    isError: isEmployeesError,
    error: employeesError,
  } = useGetEmployeesWithoutPairs();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleGeneratePairs = () => {
    mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessAlert(true);
      const timer = setTimeout(() => setShowSuccessAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

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

      {isPairsLoading || isEmployeesLoading ? (
        <Spinner animation="border" role="status" className="mt-4">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : isPairsError || isEmployeesError ? (
        <Alert variant="danger" className="mt-4">
          Failed to load data:{" "}
          {pairsError instanceof Error
            ? pairsError.message
            : employeesError instanceof Error
            ? employeesError.message
            : "Unknown error"}
        </Alert>
      ) : (
        <>
          {pairs && pairs.length > 0 && (
            <ListGroup className="mt-4 w-50">
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

          {employeesWithoutPairs && employeesWithoutPairs.length > 0 && (
            <ListGroup className="mt-4 w-50">
              <ListGroup.Item variant="warning" className="text-center">
                <strong>Employees Without Pairs</strong>
              </ListGroup.Item>
              {employeesWithoutPairs.map((employee, index) => (
                <ListGroup.Item key={index}>
                  <strong>Employee:</strong> {employee.name} {employee.surname}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
