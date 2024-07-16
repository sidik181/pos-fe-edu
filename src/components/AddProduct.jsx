import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomInput } from "./FormInput";
import { Link, useNavigate } from "react-router-dom";
import { addProduct } from "../app/api/products";
import { getErrorMessage } from "../utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, unsetLoading } from "../app/features/loading/loadingSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const loading = useSelector((state) => state.loading);

  const initialValues = {
    product_name: "",
    price: "",
    stock: "",
  };

  const validationSchema = Yup.object().shape({
    product_name: Yup.string()
      .min(3, "Nama produk minimal 3 karakter")
      .required("Nama produk harus diisi"),
    price: Yup.number()
      .min(1000, "Harga minimal Rp 1.000")
      .required("Harga harus diisi"),
    stock: Yup.number().min(1, "Stok minimal 1").required("Stok harus diisi"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      dispatch(setLoading());
      await addProduct(values);
			navigate("/settings");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      resetForm();
      setErrorMessage("");
      dispatch(unsetLoading());
    }
  };

  return (
    <div className="py-4 px-8">
      <h1 className="text-xl font-bold text-gray-800 mb-2">Tambah Produk</h1>
      {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}
      <div></div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty }) => (
          <Form
            autoComplete="off"
            noValidate
          >
            <div className="flex flex-col gap-3 text-left">
              <CustomInput
                className="text-gray-800 flex flex-col w-full"
                label="Nama Produk:"
                name="product_name"
                type="text"
                placeholder="Masukkan nama produk"
              />
              <CustomInput
                className="text-gray-800 flex flex-col w-full"
                label="Harga:"
                name="price"
                type="number"
                placeholder="Minimal harga 1.000"
              />
              <CustomInput
                className="text-gray-800 flex flex-col w-full"
                label="Stok:"
                name="stock"
                type="number"
                placeholder="Minimal stok 1"
              />
              <div className="flex justify-between">
                <Link to={"/settings"}>
                  <button className="bg-blue-500 hover:bg-blue-700 mt-2 text-white font-semibold w-80 rounded-md px-8 py-2">
                    Kembali
                  </button>
                </Link>
                <button
                  type="submit"
                  disabled={!isValid || !dirty || loading}
                  className={`${
                    !dirty || !isValid || loading
                      ? "bg-green-300"
                      : "bg-green-500 hover:bg-green-700"
                  } mt-2 text-white font-semibold w-80 rounded-md px-8 py-2`}
                >
                  Tambah Produk
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
