**Todo**
----

* **URL**

  1)/todo/
  2)/todo/:id

* **Method:**

  1)`GET` | `POST` 
  2)`GET`| `DELETE` | `PUT`
  
*  **URL Params**

   **Required:**
 
   `id` example "5aa14a447042900014d92cd9"

* **Data Params**

      text: String,
      url: String,
      date: String,
      complete: Boolean

* **Success Response:**
  
  GET, PUT, POST
  * **Code:** 200 <br />
    **Content:** `{
                      "_id": "5aa14a447042900014d92cd9",
                      "text": "fрпртпатипативатив",
                      "date": "10.03.20",
                      "url": "radiant-basin-31635.herokuapp.com",
                      "complete": true,
                      "__v": 0
                  }`
                  
   DELETE
   * **Code:** 200 <br />
       **Content:**
                    "Todo deleted"
   

                        
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
                      "error": {
                          "status": 404
                      }
                  }`

  OR

    POST error
    **Content:** `{
                      "success": false,
                      "message": "Some field is empty!",
                      "status": 401
                  }`
