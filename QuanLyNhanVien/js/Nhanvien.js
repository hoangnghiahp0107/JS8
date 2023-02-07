function Nhanvien(
    id,
    name,
    email,
    password,
    day,
    luongCB,
    chucvu,
    giolam,
    tongluong,
    loainhanvien)
{
    this.id = id;
    this.name=name;
    this.email=email;
    this.password=password;
    this.day=day;
    this.luongCB=luongCB;
    this.chucvu=chucvu;
    this.giolam=giolam;
    this.tongluong=tongluong;
    this.loainhanvien=loainhanvien;
}
Nhanvien.prototype.calcScore= function (){
    let chucvu=getElement("#chucvu").value;
    if (this.chucvu==="Sếp")
    {
        chucvu=3;
    }
    else if (this.chucvu==="Trưởng phòng")
    {
        chucvu=2;
    }
    else if (this.chucvu==="Nhân viên")
    {
        chucvu=1;
    }
    return (this.luongCB*chucvu);
}
Nhanvien.prototype.xeploai= function xeploai(){
    let giolam=+getElement("#gioLam").value;
    if (this.giolam>=192)
    {
        return "Xuất sắc";
    }
    if (this.giolam>=176)
    {
        return "Giỏi";
    }
    if (this.giolam>=160)
    {
        return"Khá";
    }
    else
    {
        return "Trung bình";
    }
}
