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
Nhanvien.prototype.calcScore= function(){
    let chucvu=getElement("#chucvu").value;
    if (chucvu==="Sếp")
    {
        chucvu=3;
    }
    else if (chucvu==="Trưởng phòng")
    {
        chucvu=2;
    }
    else if (chucvu==="Nhân viên")
    {
        chucvu=1;
    }
    return (this.luongCB*chucvu);
}
Nhanvien.prototype.xeploai= function(){
    let giolam=+getElement("#gioLam").value;
    if (giolam>=192)
    {
        return "Nhân viên xuất sắc";
    }
    if (giolam>=176)
    {
        return "Nhân viên giỏi";
    }
    if (giolam>=160)
    {
        return"Nhân viên khá";
    }
    else
    {
        return "Nhân viên trung bình";
    }
}
