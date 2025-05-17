"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Button from "./common/Button";
import FormikForm from "./common/Forms/FormikForm";
import * as Yup from "yup";
import FormInput from "./common/Forms/FormInput";
import { useEffect, useState } from "react";
import useUserStore from "@/store/UserStore";
import FormSubmit from "./common/Forms/FormSubmit";
import { useMutation } from "@tanstack/react-query";
import { editUser } from "@/services/UserServices";
import toast from "react-hot-toast";
import { CloudHail } from "lucide-react";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().label("Firstname"),
  lastname: Yup.string().required().label("Lastname"),
  email: Yup.string().required().email().label("Email"),
});

const ProfilePopup = ({ open, onClose }: { open: boolean; onClose: (arg: boolean) => void }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (user) {
      initialValues.firstname = user.firstname;
      initialValues.lastname = user.lastname;
      initialValues.email = user.email;
    }
  }, [user]);

  const editUserMutation = useMutation({
    mutationKey: ["edit-user", user?.id],
    mutationFn: editUser,
    onSuccess: (res) => {
      toast.success("Successfully updated profile", { duration: 2000 });

      setUser(res.data.data);
      setIsEdit(false);
    },
    onError: () => {
      toast.error("Error updating profile", { duration: 2000 });
    },
  });

  const handleEditProfile = (values: { firstname: string; lastname: string; email: string }) => {
    if (user) {
      const payload = {
        id: user?.id,
        ...values,
      };

      editUserMutation.mutate(payload);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[40rem] font-geist">
        <DialogHeader>
          <DialogTitle className="font-bold  text-lg">Profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save changes when you're done.</DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <FormikForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleEditProfile}>
            <div className="flex items-center w-full gap-2 mb-3">
              <FormInput type="text" name="firstname" placeholder="First Name" label="First Name" disabled={!isEdit} />
              <FormInput type="text" name="lastname" placeholder="Last Name" label="Last Name" disabled={!isEdit} />
            </div>

            <FormInput type="email" name="email" placeholder="Email" label="Email" disabled={!isEdit} />
            {isEdit && (
              <div className="flex items-center justify-end mt-4 gap-2">
                <Button style="outline" type="submit" click={() => setIsEdit(false)}>
                  Cancel
                </Button>
                <FormSubmit isLoading={editUserMutation.isPending}>Save Changes</FormSubmit>
              </div>
            )}
          </FormikForm>
        </div>

        {!isEdit && (
          <DialogFooter>
            <Button type="submit" click={() => setIsEdit(true)}>
              Edit
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePopup;
