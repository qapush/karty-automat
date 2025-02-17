export const putPostDekoracja = async (add, formData) => {

    const apiUrl = add ? "/api/dekoracje" : `/api/dekoracje/${formData.id}`;
          const method = add ? "POST" : "PUT";
      
          const data = await fetch(apiUrl, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          })
      
          if(!data.ok) {
              const res = await data.json();
              throw new Error(res.error)
          }
      
          const res = await data.json();
          return res;

}