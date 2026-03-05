import { RegisterType } from "@/types/register.type";
import { toast } from "sonner";

export async function register(data: RegisterType) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const finalRes = await res.json();
    // console.log(finalRes);

    if (!res.ok) {
      toast.error(finalRes.message, { position: "top-center" });
      throw new Error(finalRes.meesage);
    }
      toast.success("user add susscifully", { position: "top-center" });
      return true
  } catch (error) {
    // console.log(error);
    return null;
  }
}
