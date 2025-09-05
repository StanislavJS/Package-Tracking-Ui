import { Link, useNavigate } from "react-router-dom";
import { createPackage } from "../api/packageService";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";

// Схема валидации
const schema = yup.object({
  senderName: yup.string().required("Sender name is required"),
  senderAddress: yup.string().required("Sender address is required"),
  senderPhone: yup
    .string()
    .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number")
    .required("Sender phone is required"),
  recipientName: yup.string().required("Recipient name is required"),
  recipientAddress: yup.string().required("Recipient address is required"),
  recipientPhone: yup
    .string()
    .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number")
    .required("Recipient phone is required"),
});

type FormData = yup.InferType<typeof schema>;

export default function CreatePackage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createPackage(data);
      toast.success("Package created successfully");
      reset();
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create package");
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        ➕ Create Package
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Sender */}
        <Typography variant="h6">Sender</Typography>
        <TextField
          label="Name"
          {...register("senderName")}
          error={!!errors.senderName}
          helperText={errors.senderName?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          {...register("senderAddress")}
          error={!!errors.senderAddress}
          helperText={errors.senderAddress?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          {...register("senderPhone")}
          error={!!errors.senderPhone}
          helperText={errors.senderPhone?.message}
          fullWidth
          margin="normal"
        />

        {/* Recipient */}
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Recipient
        </Typography>
        <TextField
          label="Name"
          {...register("recipientName")}
          error={!!errors.recipientName}
          helperText={errors.recipientName?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          {...register("recipientAddress")}
          error={!!errors.recipientAddress}
          helperText={errors.recipientAddress?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          {...register("recipientPhone")}
          error={!!errors.recipientPhone}
          helperText={errors.recipientPhone?.message}
          fullWidth
          margin="normal"
        />

        {/* Submit */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{ marginTop: 3 }}
        >
             Create
        </Button>
      </form>

      <Button component={Link} to="/" sx={{ marginTop: 2 }}>
        ⬅ Back to list
      </Button>
    </Box>
  );
}
