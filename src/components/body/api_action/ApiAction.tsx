import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import LoadingIndicator from "../loading_indicator";
import { Box, Button, Typography } from "@mui/material";

export interface ApiActionProps {
  loading: boolean;
  success: boolean;
  error: string | null;
  dismiss: () => void;
}

export const ApiAction = (props: ApiActionProps) => {
  const { loading, success, error, dismiss } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        minWidth: "100%",
      }}
    >
      {loading && <LoadingIndicator />}
      {!loading &&
        (success ? (
          <CheckCircleOutlinedIcon
            sx={{
              color: "green",
              fontSize: 100,
            }}
          />
        ) : (
          <>
            <ReportGmailerrorredIcon
              sx={{
                color: "red",
                fontSize: 100,
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: "red", textAlign: "center", marginBottom: "10px" }}
            >
              {error}
            </Typography>{" "}
          </>
        ))}
      {!loading && (
        <Button
          sx={{
            backgroundColor: "blue",
            color: "white",
            "&:hover": {
              backgroundColor: "blue",
              opacity: 0.5,
            },
          }}
          onClick={dismiss}
        >
          Dismiss
        </Button>
      )}
    </Box>
  );
};
