"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Button from "../common/Button";
import FormikForm from "../common/Forms/FormikForm";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "@/services/ProductServices";
import toast from "react-hot-toast";
import FormInput from "../common/Forms/FormInput";
import FormSubmit from "../common/Forms/FormSubmit";
import { AxiosError } from "axios";

const initialValues = {
  name: "",
  sku: "",
  // image:''
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required").label("name"),
  sku: Yup.string().required("Product SKU is required").label("sku"),
});

const AddProduct = ({ open, onChange, callProduct }: { open: boolean; onChange: (v: boolean) => void; callProduct: () => void }) => {
  const addProductMutation = useMutation({
    mutationKey: ["add-product"],
    mutationFn: addProduct,
    onSuccess: () => {
      toast.success("Product Created", { duration: 2000 });
      callProduct();
      onChange(false);
    },
    onError: (err: AxiosError<any>) => {
      toast.error(err?.response?.data.message || "Issue in adding product", { duration: 2000 });
    },
  });

  const onSubmitHandler = (values: Object) => {
    addProductMutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[30rem] font-geist">
        <DialogHeader>
          <DialogTitle className="font-bold  text-lg">Add Product</DialogTitle>
          <DialogDescription>Enter product name and SKU to add product to the database</DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <FormikForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
            <div className="flex flex-col items-center gap-2">
              <FormInput type="text" name="name" label={"Product Name"} placeholder="Enter product name" />
              <FormInput type="text" name="sku" label={"Product SKU"} placeholder="Enter product SKU" />
            </div>
            <DialogFooter className="mt-4">
              <div className="flex items-center justify-end gap-2">
                <Button type="button" style="outline" click={() => onChange(false)}>
                  Cancel
                </Button>
                <FormSubmit isLoading={addProductMutation.isPending}>Add</FormSubmit>
              </div>
            </DialogFooter>
          </FormikForm>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
