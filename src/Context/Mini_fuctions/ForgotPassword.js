
export const ForgotPassword=async(email)=>{

console.log("this is forget pass")
    try {
        const res = await fetch(
          `${process.env.REACT_APP_DATAURL}/api/auth/forgot-password`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body:JSON.stringify({email}),
          }
        );
        let jsonRes = await res.json();
        const { error, ok } = jsonRes;
        console.log(jsonRes)
        if (ok) {

          return jsonRes;
        }
        if (error) {
          console.log(error)
        }
      } catch (error) {
        console.log(error.message);
        console.log("can not set reset password link");
      }




}