HosMap dự án tìm kiếm bệnh viện gần nhất

Sử dụng Google Map API render map, autocomplete address, get location form marker.

Sử dụng FireBase 
+ Realtime Database để lưu trữ ca bệnh, số xe cấp cứu hiện có của bệnh viện và cập nhật realtime vị trí của tài xế
+ Cloud Firestore lưu trữ thông tin các bệnh viện có trên hệ thống 

Chức năng gọi điện thoại cho bệnh viện:
+ Nhập số điện thoại vào và nhấn gọi sẽ chuyển đến trang ontheway
+ Trang ontheway hiển thị trạng thái xe hiện tại đã xuất phát hay đến vị trí của bệnh nhân hay chưa
+ Trang onthe way cũng hiển thị bản đồ cho phép xem vị trí của bệnh nhân và tài xế
+ Khi tài xế đến nơi xác nhận hoàn thành cuốc thì tự động chuyển về trang chủ

Một số chức năng bổ sung như:
+ Nút định vị sử dụng Geolocation API
+ Nút chuyển đổi lớp bản đồ
+ Marker có thể di chuyển được và tự động cập nhật lại vị trí ( Phù hợp ở những nơi không có địa chỉ )
+ Nút chỉ đường tự động chuyển đến trang chỉ đường của Google Map, nhập sẵn vị trí bệnh nhân và bệnh viện
