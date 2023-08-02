import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  packName: Yup.string()
    .required('Pack name is required'),
  // TODO: add additional fields as needed
});

const UploadForm = () => {
  const formik = useFormik({
    initialValues: {
      packName: '',
      // TODO: add additional fields as needed
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // TODO: implement upload logic
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="packName">Pack Name</label>
      <input
        id="packName"
        name="packName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.packName}
      />
      {formik.errors.packName ? <div>{formik.errors.packName}</div> : null}

      {/* TODO: add additional fields as needed */}

      <button type="submit" disabled={formik.isSubmitting}>
        Submit
      </button>
    </form>
  );
};

export default UploadForm;
