export const adminMenu = [
    { //user mannage
        name: 'menu.admin.manage-user', menus: [
            { name: 'menu.admin.user-CRUD', link: '/system/user-manage' },
            { name: 'menu.admin.redux-CRUD', link: '/system/user-redux' },
            { name: 'menu.admin.manage-admin', link: '/system/user-admin' },
            { name: 'menu.admin.manage-doctor', link: '/system/user-doctor' },



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
        name: 'menu.admin.specialty', menus: [
            { name: 'menu.admin.manage-specialty', link: '/system/manage-specialty' },
        ]
    },
    { //handbook mannage
        name: 'menu.admin.handbook', menus: [
            { name: 'menu.admin.manage-handbook', link: '/system/manage-handbook' },
        ]
    },
];