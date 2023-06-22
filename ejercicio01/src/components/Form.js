import { useForm, Controller } from "react-hook-form";
import { TextField, Typography, Grid, Button } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
};

const formSchema = yup.object({
  firstName: yup
    .string("El nombre debe ser un String")
    .trim()
    .min(3, "debe ser cualquiera ")
    .required("Este campo es requerido"),
  lastName: yup
    .string("El apellido debe ser un String")
    .trim()
    .min(3, "El minimo de caracteres es 3")
    .required("Este campo es requerido"),
  email: yup.string().trim().email("El email no es valido").required("El campo es requerido"),
});

const Form = () => {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data)
}

console.log(errors)
  return (
    <Grid container spacing={2}>
      <Typography variant="h4">Formulario</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid xs={8}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => <TextField {...field} />}
          />
          {errors.firstName && <Typography>{errors.firstName.message}</Typography>}
        </Grid>
        <Grid xs={4}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => <TextField {...field} />}
          />
          {errors.lastName && <Typography>{errors.lastName.message}</Typography>}
        </Grid>
        <Grid xs={4}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField {...field} />
            )}
          />
          {errors.email && <Typography>{errors.email.message}</Typography>}
        </Grid>
        <Button type="submit">Enviar</Button>
      </form>
    </Grid>
  );
};

export default Form;
