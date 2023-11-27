
let TotalData=[];
function data() {
    $.ajax({
        url: " http://localhost:3000/students",
        type: "GET",
        success: function (response) {
            var data = response;
            TotalData = data;
            console.log("vbd   " + TotalData);
            
            let tableData = "";
            TotalData.map((values) => {
                tableData += `
                    <tr>
                        <th scope="row">${values.id}</th>
                        <td>${values.Name}</td>
                        <td>${values.Email}</td>
                        <td>${values.Designation}</td>
                        <td><button class="btn btn-primary" onclick="updateRecord(${values.id})">Edit</button></td>
                        <td><button class="btn btn-danger" onclick="deleteRecord(${values.id})">Delete</button></td>
                    </tr>`;
            });

            $("#table-body").html(tableData);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

function add() {
    var name = $("#name").val();
    var email = $("#email").val();
    var designation = $("#designation").val();

    const postData = {
        Name: name,
        Email: email,
        Designation: designation
    };

    console.log(postData);

    $.ajax({
        url: "http://localhost:3000/students",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(postData),
        success: function (response) {
            console.log("response", response);
            data();
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
}


function deleteRecord(id) {
    // alert("The data is deleted...!");
    const url = "http://localhost:3000/students";

    $.ajax({
        url: `${url}/${id}`,
        type: "DELETE",
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}


function updateRecord(id) {
    let mm = TotalData.find(item => item.id === id);
    console.log("mm ", mm);
  
  
    $("#name").val(mm.Name);
    $("#email").val(mm.Email);
    $("#designation").val(mm.Designation);
    $("#ubtn").css("display", "block");
    $("#sebtn").css("display", "none");
    $("#uppH").css("display", "block");
    $("#instH").css("display", "none");

    let btn = $("#ubtn");
    btn.on('click', function (event) {
      
        let name = $("#name").val();
        let email = $("#email").val();
        let Des = $("#designation").val();

        if (name === '' || email === '' || Des === '') {
            alert("Please Don't give empty fields..!");
        } else {
            let data = {  Name: name, Email: email, Designation: Des };
            console.log("Updating data:", data);

            $.ajax({
                url: `http://localhost:3000/students/${id}`,
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (response) {
                    const updatedData = response;
                    console.log("Updated data:", updatedData);
                  
                    $("#name").val('');
                    $("#email").val('');
                    $("#ubtn").hide();
                },
                error: function (error) {
                    alert(error);
                }
            });
        }
    });
}




