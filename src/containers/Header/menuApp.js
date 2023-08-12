export const adminMenu = [
    { //user mannage
        name: 'menu.admin.manage-user', menus: [
            { name: 'menu.admin.user-CRUD', link: '/system/user-manage' },
            { name: 'menu.admin.redux-CRUD', link: '/system/user-redux' },
            // { name: 'menu.admin.manage-admin', link: '/system/user-admin' },
            { name: 'menu.admin.manage-doctor', link: '/system/manage-doctor' },
            { name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule' },



            // subMenus: [
            //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
            //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
            // ]

        ]
    },
    { //user mannage
        name: 'menu.admin.clinic', menus: [
            { name: 'menu.admin.manage-clinic', link: '/system/manage-clinic' },
        ]
    },
    { //specialty mannage
        name: 'menu.admin.specialty', menus: [//, link: '/system/manage-specialty'
            { name: 'menu.admin.manage-specialty', link: '/system/manage-specialty' },
        ]
    },
    { //handbook mannage
        name: 'menu.admin.handbook', menus: [
            { name: 'menu.admin.manage-handbook', link: '/system/manage-handbook' },
        ]
    },

];

export const doctorMenu = [
    { //manage doctors' schedule
        name: 'menu.admin.manage-user', menus: [
            { name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule' },
        ]
    }
];