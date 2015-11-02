Meteor.publish("i18n", function () {
    return I18n.find({});
});

Meteor.startup(function () {
    var app = [
        {id:'0',
            info:{lang: 'en', set: {
            sys:{
                err:{
                    require: 'This is required!',
                    min: 'At least {{value}} character'
                },
                button:{
                    create: 'Create',
                    createInit: 'Create - Init',
                    createClose: 'Create - Close',
                    bookDorm: 'Book a room',
                    save: 'Save',
                    edit: 'Edit',
                    delete: 'Delete',
                    cancel: 'Cancel',
                    import: 'Import',
                    login: 'Login',
                    logout: 'Log out',
                    tabMode: 'Mode',
                    language: 'Languages',
                    vi: 'Tiếng Việt',
                    en: 'English'
                },
                tabNames: {
                    dashboard: 'Dashboard',
                    users: 'Users',
                    groups: 'Groups',
                    members: 'Members',
                    navigations: 'Navigations',
                    profiles: 'Profiles',
                    templates: 'Templates',
                    dorm_dashboard: 'Domitory Dashboard',
                    list_room: 'List Rooms',
                    dormitory: 'Dormitory Manager',
                    permission_dorm: 'Dormitory Permissons',
                    // CRM
                    contactType: 'Contact Types',
                    customField: 'Custom fields',
                    contact: 'Contacts',
                    company: 'Companies',
                    task: 'Tasks',
                    deal: 'Deals',
                    case: 'Cases',
                    category: 'Categories',
                    source: 'Sources',
                    status: 'Statuses',
                    salePath: 'Sale Paths',
                    note: 'Notes',
                    event: 'Events',
                    call: 'Calls',
                    product: 'Products',
                    CRMDocument: 'Documents',
                    importContact: 'Import contacts',
                    supportSchedule: 'Support Schedules',
                    // AIS
                    country: 'Countries',
                    customerGroup: 'Customer Groups',
                    //vietbeacon
                    organizations: 'Organizations',
                    locations: 'Locations',
                    touchPoints: 'TouchPoints',
                    designs: 'TouchPoints',
                    cards: 'Cards',
                    visits: 'Visits',
                    // SRM
                    stockType: 'Stock Types',
                    stockModel: 'Stock Models',
                    // POS
                    priceType: 'Price Types'
                },
                form: {
                    users:{
                        create: 'Create User',
                        edit: 'Edit User {{valuename}}',
                        changePassword: 'Change Password',
                        username: 'User Name',
                        password: 'New password',
                        confirm: 'New password confirm'
                    },
                    usersProfile:{
                        create: 'Create {{valuename}} Profile'
                    },
                    profile:{
                        create: 'Create Profile',
                        edit: 'Edit {{valuename}}'
                    },
                    navigations: {
                        create: 'Create Menu',
                        edit: 'Edit {{valuename}}',
                        name: 'Menu Name'
                    },
                    members: {
                        create: 'Create Member'
                    },
                    template:{
                        create: 'Create template',
                        edit: 'Edit template {{valuename}}'
                    }
                }
            },
            module: {
                ais: {
                    city: {
                        create: 'Create city',
                        edit: 'Edit city {{valuename}}'
                    },
                    province: {
                        create: 'Create province',
                        edit: 'Edit province {{valuename}}'
                    },
                    country: {
                        create: 'Create country',
                        edit: 'Edit country {{valuename}}'
                    },
                    customerGroup: {
                        create: 'Create customer group',
                        edit: 'Edit customer group {{valuename}}'
                    }
                },
                crm: {
                    contactType: {
                        create: 'Create contact type',
                        edit: 'Edit contact type {{valuename}}'
                    },
                    customField: {
                        create: 'Create field',
                        edit: 'Edit field {{valuename}}'
                    },
                    contact: {
                        create: 'Create contact',
                        edit: 'Edit contact {{valuename}}'
                    },
                    company: {
                        create: 'Create company',
                        edit: 'Edit company {{valuename}}'
                    },
                    task: {
                        create: 'Create task',
                        edit: 'Edit task {{valuename}}'
                    },
                    deal: {
                        create: 'Create deal',
                        edit: 'Edit deal {{valuename}}'
                    },
                    case: {
                        create: 'Create case',
                        edit: 'Edit case {{valuename}}'
                    },
                    category: {
                        create: 'Create category',
                        edit: 'Edit category {{valuename}}'
                    },
                    source: {
                        create: 'Create source',
                        edit: 'Edit source {{valuename}}'
                    },
                    status: {
                        create: 'Create status',
                        edit: 'Edit status {{valuename}}'
                    },
                    salePath: {
                        create: 'Create sale path',
                        edit: 'Edit sale path {{valuename}}'
                    },
                    note: {
                        create: 'Create note',
                        edit: 'Edit note {{valuename}}'
                    },
                    event: {
                        create: 'Create event',
                        edit: 'Edit event {{valuename}}'
                    },
                    call: {
                        create: 'Create call',
                        edit: 'Edit call {{valuename}}'
                    },
                    product: {
                        create: 'Create product',
                        edit: 'Edit product {{valuename}}'
                    },
                    CRMDocument: {
                        create: 'Create document',
                        edit: 'Edit document {{valuename}}'
                    },
                    importContact: {
                        import: 'Import contacts'
                    }
                },
                dorm: {
                    dashboard:{
                        pleaseSelectDorm: 'Please select Dormitory!',
                        createStudent: 'Create Student',
                        map: 'Map room',
                        listStudent: 'Students',
                        changeRoom: 'Change Room',
                        toroom: 'To Room',
                        fromroom: 'From Room',
                        selectDorm: 'select Dorm',
                        selectRoom: 'select Room',
                        checkIn: 'Check in',
                        deposit: 'Deposit'
                    },
                    profile:{
                        seeInfo: 'Check Info'
                    },
                    floor: {
                        1: 'I',
                        2: 'II',
                        3: 'III',
                        4: 'IV',
                        5: 'V',
                        6: 'VI',
                        7: 'VII',
                        8: 'VIII',
                        9: 'IX',
                        10: 'X'
                    },
                    roomdorm: {
                        create: 'Create Room for {{valuename}}',
                        edit: 'Edit {{valuename}}'
                    },
                    student: {
                        amount: 'Amount',
                        paid: 'Paid',
                        debtor: 'Debtor',
                        create: 'Create Student for {{valuename}}',
                        edit: 'Edit Student {{valuename}}',
                        book: 'Book room {{valuename}}',
                        checkIn: 'Check in {{valuename}}',
                        gender: 'Gender',
                        studentId: 'Student ID',
                        lastName: 'Last Name',
                        firstName: 'First Name',
                        class: 'Class',
                        email: 'Email',
                        mobilePhone: 'Mobile Phone',
                        birthday: 'Birthday',
                        room: 'Room ID',
                        floor: 'Floor',
                        homePhone: 'Home Phone',
                        address: 'Address',
                        fatherName: "Father's full name",
                        motherName: "Mother's full name",
                        fatherJob: "Father's Job",
                        motherJob: "Mother's Job",
                        profile: 'Profile',
                        timeline: 'Timeline',
                        book: 'Book',
                        changeto: 'Changed to',
                        updateinfo: 'Updated Information',
                        deposit: 'Deposit',
                        by: 'By',
                        contact: 'Contact',
                        basic: 'Basic Information',
                        detail: 'Detail'
                    }
                },
                vietbeacon: {
                    organizations: {
                        create: 'Create Organization',
                        edit: 'Edit Organization'
                    },
                    locations: {
                        create: 'Create Locations',
                        edit: 'Edit Locations'
                    },
                    touchPoints: {
                        create: 'Create TouchPoints',
                        edit: 'Edit TouchPoints'
                    },
                    designs: {
                        create: 'Create Designs',
                        edit: 'Edit Designs'
                    },
                    cards: {
                        create: 'Create Cards',
                        edit: 'Edit Cards'
                    },
                    visits: {
                        create: 'Create Visits',
                        edit: 'Edit Visits'
                    }
                },
                pos: {
                    priceType: {
                        create: 'Create price type',
                        edit: 'Edit price type {{valuename}}'
                    }
                },
                srm: {
                    stockType: {
                        create: 'Create stock type',
                        edit: 'Edit stock type {{valuename}}'
                    },
                    stockModel: {
                        create: 'Create stock model',
                        edit: 'Edit stock model {{valuename}}'
                    },
                    priceType: {
                        create: 'Create price type',
                        edit: 'Edit price type {{valuename}}'
                    }
                }
            }
        }}},
        {id:'1',
            info:{lang: 'vi', preferred: true ,set: {
            sys:{
                err:{
                    require: 'Bắt buộc nhập!',
                    min: 'Ít nhất {{value}} ký tự'
                },
                button:{
                    create: 'Tạo mới',
                    createInit: 'Lưu - Khởi tạo',
                    createClose: 'Lưu - Đóng',
                    save: 'Lưu thay đổi',
                    edit: 'Sửa',
                    delete: 'Xóa',
                    cancel: 'Trở lại',
                    import: 'Import',
                    bookDorm: 'Đặt phòng',
                    login: 'Đăng nhập',
                    logout: 'Đăng xuất',
                    tabMode: 'Xem chế độ',
                    language: 'Ngôn ngữ',
                    vi: 'Tiếng Việt',
                    en: 'English'
                },
                tabNames: {
                    dashboard: 'Thông tin chung',
                    users: 'Danh sách người dùng',
                    groups: 'Danh sách nhóm',
                    members: 'Danh sách thành viên nhóm',
                    navigations: 'Thanh menu',
                    profiles: 'Hồ sơ',
                    templates: 'Giao diện',
                    dorm_dashboard: 'Thông tin chung',
                    list_room: 'Danh sách phòng',
                    dormitory: 'Quản lý ký túc xá',
                    permission_dorm: 'Phân quyền ký túc xá',
                    // CRM
                    contactType: 'Loại liên hệ',
                    customField: 'Mở rộng thuộc tính',
                    contact: 'Liên hệ',
                    company: 'Công ty',
                    task: 'Nhiệm vụ',
                    deal: 'Giao dịch',
                    case: 'Hỗ trợ',
                    category: 'Loại',
                    source: 'Nguồn',
                    status: 'Trạng thái',
                    salePath: 'Quy trình Sale',
                    note: 'Ghi chú',
                    event: 'Sự kiện',
                    call: 'Cuộc gọi',
                    product: 'Sản phẩm',
                    CRMDocument: 'Tài liệu',
                    importContact: 'Import liên hệ',
                    supportSchedule: 'Lịch hỗ trợ',
                    // AIS
                    country: 'Quốc gia',
                    customerGroup: 'Nhóm khách hàng',
                    //vietbeacon
                    organizations: 'Organizations',
                    locations: 'Địa điểm',
                    touchPoints: 'Điểm phát',
                    designs: 'Thiết kế',
                    cards: 'cards',
                    visits: 'Số lần xem',
                    // SRM
                    stockType: 'Loại hàng',
                    stockModel: 'Kiểu hàng',
                    // POS
                    priceType: 'Loại giá'
                },
                form: {
                    users:{
                        create: 'Tạo Người dùng',
                        edit: 'Chỉnh sửa {{valuename}}',
                        changePassword: 'Đổi mật khẩu',
                        username: 'Tên tài khoản',
                        password: 'Mật khẩu mới',
                        confirm: 'Xác nhận mật khẩu mới'
                    },
                    usersProfile:{
                        create: 'Tạo hồ sơ {{valuename}}'
                    },
                    profile:{
                        create: 'Tạo hồ sơ',
                        edit: 'Chỉnh sửa {{valuename}}'
                    },
                    navigations: {
                        create: 'Tạo Menu',
                        edit: 'Chỉnh sửa menu {{valuename}}',
                        name: 'Tên Menu'
                    },
                    members: {
                        create: 'Tạo Member'
                    },
                    template:{
                        create: 'Tạo giao diện',
                        edit: 'Sửa giao diện {{valuename}}'
                    }
                }
            },
            module:{
                ais: {
                    city: {
                        create: 'Tạo thành phố',
                        edit: 'Sửa thành phố {{valuename}}'
                    },
                    province: {
                        create: 'Tạo tỉnh',
                        edit: 'Sửa tỉnh {{valuename}}'
                    },
                    country: {
                        create: 'Tạo quốc gia',
                        edit: 'Sửa quốc gia {{valuename}}'
                    },
                    customerGroup: {
                        create: 'Tạo nhóm khách hàng',
                        edit: 'Sửa nhóm khách hàng {{valuename}}'
                    }
                },
                crm: {
                    contactType: {
                        create: 'Tạo loại liên hệ',
                        edit: 'Sửa loại liên hệ {{valuename}}'
                    },
                    customField: {
                        create: 'Thêm thuộc tính',
                        edit: 'Sửa thuộc tính {{valuename}}'
                    },
                    contact: {
                        create: 'Tạo liên hệ',
                        edit: 'Sửa liên hệ {{valuename}}'
                    },
                    company: {
                        create: 'Tạo công ty',
                        edit: 'Sửa công ty {{valuename}}'
                    },
                    task: {
                        create: 'Tạo nhiệm vụ',
                        edit: 'Sửa nhiệm vụ {{valuename}}'
                    },
                    deal: {
                        create: 'Tạo giao dịch',
                        edit: 'Sửa giao dịch {{valuename}}'
                    },
                    case: {
                        create: 'Tạo hỗ trợ',
                        edit: 'Sửa hỗ trợ {{valuename}}'
                    },
                    category: {
                        create: 'Tạo loại',
                        edit: 'Sửa loại {{valuename}}'
                    },
                    source: {
                        create: 'Tạo nguồn',
                        edit: 'Sửa nguồn {{valuename}}'
                    },
                    status: {
                        create: 'Tạo trạng thái',
                        edit: 'Sửa trạng thái {{valuename}}'
                    },
                    salePath: {
                        create: 'Tạo quy trình Sale',
                        edit: 'Sửa quy trình Sale {{valuename}}'
                    },
                    note: {
                        create: 'Tạo ghi chú',
                        edit: 'Sửa ghi chú {{valuename}}'
                    },
                    event: {
                        create: 'Tạo sự kiện',
                        edit: 'Sửa sự kiện {{valuename}}'
                    },
                    call: {
                        create: 'Tạo cuộc gọi',
                        edit: 'Sửa cuộc gọi {{valuename}}'
                    },
                    product: {
                        create: 'Tạo sản phẩm',
                        edit: 'Sửa sản phẩm {{valuename}}'
                    },
                    CRMDocument: {
                        create: 'Tạo tài liệu',
                        edit: 'Sửa tài liệu {{valuename}}'
                    },
                    importContact: {
                        import: 'Import liên hệ'
                    }
                },
                dorm: {
                    floor: {
                        1: 'I',
                        2: 'II',
                        3: 'III',
                        4: 'IV',
                        5: 'V',
                        6: 'VI',
                        7: 'VII',
                        8: 'VIII',
                        9: 'IX',
                        10: 'X'
                    },
                    dashboard:{
                        pleaseSelectDorm: 'Xin chọn KTX!',
                        createStudent: 'Thêm SV',
                        map: 'Phòng',
                        listStudent: 'Sinh viên',
                        changeRoom: 'Chuyển phòng ',
                        toroom: 'Đến phòng',
                        fromroom: 'Từ phòng',
                        selectDorm: 'chọn KTX',
                        selectRoom: 'chọn Phòng',
                        checkIn: 'Nhận phòng',
                        deposit: 'Đóng tiền'
                    },
                    profile:{
                        seeInfo: 'Thông tin'
                    },
                    roomdorm: {
                        create: 'Tạo phòng cho {{valuename}}',
                        edit: 'Sửa phòng {{valuename}}'
                    },
                    student: {
                        amount: 'Số tiền',
                        paid: 'Đã nộp',
                        debtor: 'Còn nợ',
                        create: 'Thêm sinh viên ở {{valuename}}',
                        edit: 'Sửa sinh viên {{valuename}}',
                        book: 'Đặt phòng {{valuename}}',
                        checkIn: 'Duyệt sinh viên {{valuename}}',
                        studentId: 'MSSV/SBD',
                        lastName: 'Họ lót',
                        firstName: 'Tên',
                        gender: 'Giới tính',
                        class: 'Lớp',
                        email: 'Email',
                        mobilePhone: 'ĐTDĐ',
                        birthday: 'Ngày sinh',
                        room: 'Phòng',
                        floor: 'Tầng',
                        homePhone: 'Điện thoại bàn',
                        address: 'Địa chỉ',
                        fatherName: "Họ tên Cha",
                        motherName: "Họ tên Mẹ",
                        fatherJob: "Nghề nghiệp cha",
                        motherJob: "Nghề nghiệp mẹ",
                        profile: 'Hồ sơ',
                        timeline: 'Lược sử',
                        book: 'Đặt phòng',
                        changeto: 'Chuyển đến phòng',
                        updateinfo: 'Cập nhật hồ sơ',
                        deposit: 'Đã đóng',
                        by: 'bởi',
                        contact: 'Liên hệ',
                        basic: 'Thông tin chung',
                        detail: 'Chi tiết'
                    }
                },
                vietbeacon: {
                    organizations: {
                        create: 'Tạo Organization',
                        edit: 'Sửa Organization'
                    },
                    locations: {
                        create: 'Tạo địa điểm',
                        edit: 'Sửa địa điểm'
                    },
                    touchPoints: {
                        create: 'Tạo điểm phát',
                        edit: 'Sửa điểm phát'
                    },
                    designs: {
                        create: 'Tạo thiết kế',
                        edit: 'Sửa thiết kế'
                    },
                    cards: {
                        create: 'Tạo cards',
                        edit: 'Sửa cards'
                    },
                    visits: {
                        create: 'Tạo số lần xem'
                    }
                },
                pos: {
                    priceType: {
                        create: 'Tạo loại giá',
                        edit: 'Sửa loại giá {{valuename}}'
                    }
                },
                srm: {
                    stockType: {
                        create: 'Tạo loại hàng',
                        edit: 'Sửa loại hàng {{valuename}}'
                    },
                    stockModel: {
                        create: 'Tạo kiểu hàng',
                        edit: 'Sửa kiểu hàng {{valuename}}'
                    }
                }
            }
        }}}
    ];
    app.forEach(function(item){
        I18n.upsert({_id:item.id}, item.info);
    });
});
