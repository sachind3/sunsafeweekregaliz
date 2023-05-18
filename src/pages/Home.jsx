import { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PicModal from "../components/PicModal";
import { AppContext } from "../context";
import { useNavigate } from "react-router-dom/dist";
const DoctorInfo = () => {
  const { setDocInfo } = useContext(AppContext);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Doctor name is required"),
    mobile: Yup.string(),
    photo: Yup.mixed().when({
      is: null,
      then: Yup.mixed().required(),
      otherwise: Yup.mixed().notRequired(),
    }),
  });
  const [openModal, setOpenModal] = useState({});

  return (
    <>
      <div className="grow flex flex-col items-center">
        <Formik
          initialValues={{
            fullName: "",
            mobile: "",
            photo: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(val) => {
            const data = {
              fullName: `Dr. ${val.fullName}`,
              mobile: val.mobile,
              photo: val.photo,
            };
            setDocInfo(data);
            navigate("/download-poster");
          }}
        >
          {({
            handleBlur,
            handleSubmit,
            errors,
            isValid,
            dirty,
            handleChange,
            setFieldValue,
            values,
          }) => (
            <>
              <Form
                className="py-4 px-10 bg-white shadow mt-6"
                onSubmit={handleSubmit}
              >
                <h4 className="text-theme_purple-500 font-bold text-2xl text-center mb-4">
                  Doctor Details
                </h4>
                <div className="mb-4">
                  {values.photo ? (
                    <div
                      className="border-dashed border-2 border-theme-blue rounded w-[50%] pt-[50%] h-0 mx-auto overflow-hidden relative block"
                      onClick={() => {
                        setOpenModal({
                          show: true,
                          setFieldValue: setFieldValue,
                        });
                      }}
                    >
                      <div className="text-center absolute top-0 left-0 w-full h-full block text-theme-blue">
                        <img
                          src={values.photo}
                          alt="user"
                          className="w-full h-full"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-gray-900/75 text-white p-2">
                          Edit
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="border-dashed border-2 border-theme-blue rounded w-[50%] pt-[50%] h-0 mx-auto overflow-hidden relative block"
                      onClick={() => {
                        setOpenModal({
                          show: true,
                          setFieldValue: setFieldValue,
                        });
                      }}
                    >
                      <div className="text-center absolute text-[4rem] top-0 left-0 w-full h-full flex items-center justify-center text-theme-blue">
                        <svg
                          className="svg-icon"
                          viewBox="0 0 20 20"
                          width="143"
                          height="143"
                        >
                          <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative form-group">
                  <label htmlFor="fullName" className="form-label">
                    Doctor Full Name
                  </label>
                  <div className="relative">
                    <Field
                      id="fullName"
                      name="fullName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                  </div>
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="hasError"
                  />
                </div>
                <div className="relative form-group">
                  <label htmlFor="mobile" className="form-label">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Field
                      id="mobile"
                      name="mobile"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control "
                    />
                  </div>
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="hasError"
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-full"
                  disabled={!(isValid && dirty)}
                >
                  Submit
                </button>
              </Form>
            </>
          )}
        </Formik>
      </div>
      <PicModal
        show={openModal.show}
        setShow={setOpenModal}
        setFieldValue={openModal.setFieldValue}
      />
    </>
  );
};
export default DoctorInfo;
