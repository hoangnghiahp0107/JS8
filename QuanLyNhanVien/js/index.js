// Tạo mảng chứa danh sách nhân viên
let nhanvienList = [];
// Hiển thị danh sách nhân viên
renderTable(nhanvienList);
// Hàm thêm nhân viên
function createNV(){ 
    // B1: DOM
    let id = getElement("#tknv").value;
    let name = getElement("#name").value;
    let email = getElement("#email").value;
    let password = getElement("#password").value;
    let day = getElement("#datepicker").value;
    let luongCB = +getElement("#luongCB").value;
    let chucvu = getElement("#chucvu").value;
    let giolam = +getElement("#gioLam").value;
    // B1.1: Kiểm tra các input có hợp lệ hay không
    let isValid = validate();
    // isValid là false => form không hợp lệ => không cho phép tạo student bằng cách kết thúc hàm
    if (!isValid) {
        return;
    }

    // Bước 2: Khởi tạo object nhanvien
    const nhanvien = new Nhanvien (
         id,
         name,
         email,
         password,
         day,
         luongCB,
         chucvu,
         giolam
    );

    // B3: Thêm object student vào mảng studentList
    nhanvienList.push(nhanvien);

    // B4: Hiển thị danh sách studentList ra table
    renderTable(nhanvienList);

    // B5: Gọi hàm resetForm để xóa hết tất cả value của các input
    resetForm();

}

// Hàm tìm kiếm xếp loại nhân viên
function search(){
    // B1: DOM
    let searchName=getElement("#searchName").value;

    // B2: Lọc những user có name khớp với giá trị search
    let newList = nhanvienList.filter((nhanvien)=>{
        let xeploai =nhanvien.xeploai.toLowerCase();
        searchName = searchName.toLowerCase();
        return xeploai.indexOf(searchName) !==-1;
    })
    // B3: Gọi hàm renderTable để hiển thị ra giao diện
    renderTable(newList);
}

//Hàm xóa nhân viên theo id
function deleteNhanvien(nhanvienID){
    // // Cách 1: Tìm index của student cần xóa trong mảng nhanvienList và xóa bằng hàm splice
    // let index = nhanvienList.findIndex((nhanvien)=>{
    //     // Nếu return về true => trả ra index của phần tử đang duyệt qua
    //     // Trả ra -1 nếu tất cả đều return về false

    //     return nhanvien.id===nhanvienID;
    // });
    // nhanvienList.splice(index,1);

    // Cách 2: Dùng filter
    nhanvienList =nhanvienList.filter((nhanvien)=>{
        return nhanvien.id !== nhanvienID;
    });
    // Gọi hàm renderTable để cập nhật giao diện
    renderTable(nhanvienList);
} 

//Hàm tìm nhân viên theo id để fill thông tin lên form
function Update(nhanvienID){    
    // B1: Tìm sinh viên muốn chỉnh sửa dựa vào id
    let Capnhat = nhanvienList.find((nhanvien)=>{
    // Nếu return vể true => trả giá trị của phàn tử đang duyệt qua
    // Trả ra undefined nếu tất cả đều return về false
        return nhanvien.id === nhanvienID;
    })

    // B2: Lấy thông tin của nhân viên tìm được để fill lên form 
    getElement("#tknv").value=Capnhat.id;
    getElement("#name").value=Capnhat.name;
    getElement("#email").value=Capnhat.email;
    getElement("#password").value=Capnhat.password;
    getElement("#datepicker").value=Capnhat.day;
    getElement("#luongCB").value=Capnhat.luongCB;
    getElement("#chucvu").value=Capnhat.chucvu;
    getElement("#gioLam").value=Capnhat.giolam;
    // B3: Disable input mã sv và button thêm sv
    getElement("#btnThemNV").setAttribute('disabled','');
    getElement("#tknv").setAttribute('disabled','');
} 
// Hàm cập nhật thông tin sinh viên
function UpdateNV(){ 
    // B1: DOM
    let id = getElement("#tknv").value;
    let name = getElement("#name").value;
    let email = getElement("#email").value;
    let password = getElement("#password").value;
    let day = getElement("#datepicker").value;
    let luongCB = +getElement("#luongCB").value;
    let chucvu = getElement("#chucvu").value;
    let giolam= +getElement("#gioLam").value;
    // B1.1: Kiểm tra các input có hợp lệ hay không
    let isValid = validate();
    // isValid là false => form không hợp lệ => không cho phép tạo student bằng cách kết thúc hàm
    if (!isValid) {
        return;
    }

    // B2: Khởi tạo object student
    const nhanvien = new Nhanvien (
         id,
         name,
         email,
         password,
         day,
         luongCB,
         chucvu, 
         giolam
    );
    
    // B3: Cập nhật thông tin mới của Student
    let index = nhanvienList.findIndex((nhanvien)=>{
        return nhanvien.id===id;
    })
    nhanvienList[index]=nhanvien;
    // B4: gọi hàm renderTable để cập nhật giao diện
    renderTable(nhanvienList);
    // B5: Gọi hàm reset form
    resetForm();
}
// Hàm hiển thị danh sách ra table
function renderTable(nhanvienList){
    let html = nhanvienList.reduce((output, nhanvien) => {
        return (
        output +
         `
        <tr>
        <td>${nhanvien.id}</td>
        <td>${nhanvien.name}</td>
        <td>${nhanvien.email}</td>
        <td>${nhanvien.day}</td>
        <td>${nhanvien.chucvu}</td>
        <td>${nhanvien.calcScore()}</td>
        <td >${nhanvien.xeploai()}</td>
        <td>
        <button class = "btn btn-primary mb-3" onclick="Update('${nhanvien.id}')" data-toggle="modal" data-target="#myModal">Chỉnh sửa</button>
        <br>
        <button class = "btn btn-danger" onclick ="deleteNhanvien('${nhanvien.id}')">Xóa</button>
        </td>
        </tr>
        `
        );
    },"");
    getElement("#tableDanhSach").innerHTML = html;
}

// Hàm reset giá trị của các input
function resetForm(){
    getElement("#tknv").value="";
    getElement("#name").value="";
    getElement("#email").value="";
    getElement("#password").value="";
    getElement("#datepicker").value="";
    getElement("#luongCB").value="";
    getElement("#chucvu").value="";
    getElement("#gioLam").value="";

    getElement("#btnThemNV").removeAttribute('disabled');
    getElement("#tknv").removeAttribute('disabled');
}
function getElement(selector){
    return document.querySelector(selector);
}
// Validate input trước khi cho phép thêm/cập nhật sinh viên
function validate(){
    // Mặc định ban đầu là form hợp lệ
    let isValid = true; 
    // kiểm tra mã tknv
    let id = getElement("#tknv").value;
    if (!id.trim())
    {
        // Input không hợp lệ
        isValid = false;
        getElement("#tbTKNV").innerHTML="Tài khoản nhân viên không được để trống";
    }
    else if (!/.{4,6}/.test(id))
    {
        isValid = false;
        getElement("#tbTKNV").innerHTML="Tài khoản nhân viên không hợp lệ";
    }
    else {
        getElement("#tbTKNV").innerHTML="";
    }
    // kiểm tra name
    let name = getElement("#name").value;
    if (!name.trim())
    {
        isValid=false;
        getElement("#tbTen").innerHTML="Tên nhân viên không được để trống";
    }
    else if (!/^[\sa-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/.test(name)){
        isValid=false;
        getElement("#tbTen").innerHTML="Tên nhân viên không hợp lệ";
    }
    else {
        getElement("#tbTen").innerHTML="";
    }
    // Kiểm tra email
    let email = getElement("#email").value;
    if (!email.trim()){
        isValid = false;
        getElement("#tbEmail").innerHTML="Email không được để trống";
    }
    else if (!/^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email))
    {
        isValid = false;
    getElement("#tbEmail").innerHTML = "Email không hợp lệ";
    }
    else {
        getElement("#tbEmail").innerHTML="";
    }
    // Kiểm tra password
    let password=getElement("#password").value;
        if (!password.trim()){
            isValid = false;
            getElement("#tbMatKhau").innerHTML="Password không được để trống";
        }
        else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/.test(password)){
            isValid = false;
        getElement("#tbMatKhau").innerHTML = "Password không hợp lệ";
        }
        else {
            getElement("#tbMatKhau").innerHTML="";
        }

    // Kiểm tra ngày làm
    let day=getElement("#datepicker").value;
        if (!day.trim()){
            isValid = false;
            getElement("#tbNgay").innerHTML="Ngày làm không được để trống";
        }
        else {
            getElement("#tbNgay").innerHTML="";
        }
    // Kiểm tra lươngCB
    let luongCB=getElement("#luongCB").value;
        if (!luongCB.trim()){
            isValid = false;
            getElement("#tbLuongCB").innerHTML="Lương cơ bản không được để trống";
        }
        else if (luongCB<1000000 || luongCB>20000000)
        {
            isValid = false;
            getElement("#tbLuongCB").innerHTML="Lương cơ bản không hợp lệ";
        }
        else {
            getElement("#tbLuongCB").innerHTML="";
        }
    // Kiểm tra chức vụ
    let chucvu=getElement("#chucvu").value;
        if (chucvu==="Chọn chức vụ"){
            isValid = false;
            getElement("#tbChucVu").innerHTML="Vui lòng chọn chức vụ";
        }
        else {
            getElement("#tbChucVu").innerHTML="";
        }
    // Kiểm tra giờ làm
    let giolam=getElement("#gioLam").value;
        if (!giolam.trim()){
            isValid = false;
            getElement("#tbGiolam").innerHTML="Giờ làm không được để trống";
        }
        else if (giolam<80 || giolam>200){
            isValid = false;
            getElement("#tbGiolam").innerHTML="Giờ làm không hợp lệ";
        }
        else {
            getElement("#tbGiolam").innerHTML="";
        }
    return isValid;
}