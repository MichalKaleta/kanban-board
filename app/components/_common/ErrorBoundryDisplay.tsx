type ErrorBoundaryDisplayProps = {
	error: React.ReactNode;
	reset: () => void;
};

export const ErrorBoundaryDisplay = ({
	error,
	reset,
}: ErrorBoundaryDisplayProps) => {
	<>
		<div>ERROR CATCHED IN ERROR BOUNDARY:</div>
		<div>{error}</div>
	</>;
};
