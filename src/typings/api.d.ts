/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** 分页的常用参数 */
    interface PaginatingCommonParams {
      /** current page number */
      current: number;
      /** page size */
      size: number;
      /** total count */
      total: number;
    }

    /** 分页查询列表数据常用参数 */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      records: T[];
    }

    /**
     * 启用状态
     *
     * -“1”：启用
     * -“2”：禁用
     */
    type EnableStatus = '1' | '2';

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id: number;
      /** record creator */
      createBy: string;
      /** record create time */
      createTime: string;
      /** record updater */
      updateBy: string;
      /** record update time */
      updateTime: string;
      /** record status */
      status: EnableStatus | null;
    } & T;
  }

  /**
   * 命名空间授权
   *
   * 后端 api 模块：“auth”
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface UserInfo {
      userId: string;
      userName: string;
      roles: string[];
      buttons: string[];
    }
  }

  /**
   * 命名空间路由
   *
   * 后端 api 模块：“路由”
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      routes: MenuRoute[];
      home: import('@elegant-router/types').LastLevelRouteKey;
    }
  }

  /**
   * 命名空间系统管理
   *
   * 后端 API 模块：“systemManage”
   */
  namespace SystemManage {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

    /** common delete params */
    type CommonDeleteParams = { id: number };

    /** common batch delete params */
    type CommonBatchDeleteParams = { ids: string[] };

    /** role */
    type Role = Common.CommonRecord<{
      /** role name */
      roleName: string;
      /** role code */
      roleCode: string;
      /** role description */
      roleDesc: string;
      /** role home */
      roleHome: string;
    }>;

    /** 角色添加参数 */
    type RoleAddParams = Pick<Api.SystemManage.Role, 'roleName' | 'roleCode' | 'roleDesc' | 'roleHome' | 'status'>;

    /** role update params */
    type RoleUpdateParams = CommonType.RecordNullable<Pick<Api.SystemManage.Role, 'id'>> & RoleAddParams;

    /** 角色搜索参数 */
    type RoleSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Role, 'roleName' | 'roleCode' | 'status'> & CommonSearchParams
    >;

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>;

    /** role authorized */
    type RoleAuthorized = Api.SystemManage.Role & { menuIds: number[]; apiIds: number[]; buttonIds: number[] };

    /** get role authorized params */
    type RoleAuthorizedParams = Pick<Api.SystemManage.RoleAuthorized, 'id'>;

    /** role authorized list */
    type RoleAuthorizedList = CommonType.RecordNullable<RoleAuthorized>;

    /** all role */
    type AllRole = Pick<Role, 'id' | 'roleName' | 'roleCode'>;

    /**
     * api method
     *
     * - "1": "GET"
     * - "2": "POST"
     * - "3": "PUT"
     * - "4": "PATCH"
     * - "5": "DELETE"
     */
    type methods = 'get' | 'post' | 'put' | 'patch' | 'delete';

    /** api */
    type Api = Common.CommonRecord<{
      /** api path */
      path: string;
      /** api method */
      method: methods;
      /** api summary */
      summary: string;
      /** api tags name */
      tags: string;
    }>;

    /** api add params */
    type ApiAddParams = Pick<Api.SystemManage.Api, 'path' | 'method' | 'summary' | 'tags' | 'status'>;

    /** api update params */
    type ApiUpdateParams = CommonType.RecordNullable<Pick<Api.SystemManage.Api, 'id'>> & ApiAddParams;

    /** api search params */
    type ApiSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Api, 'path' | 'method' | 'summary' | 'tags' | 'status'> & CommonSearchParams
    >;

    /** api list */
    type ApiList = Common.PaginatingQueryRecord<Api>;

    /**
     * log type
     *
     * - "1": "ApiLog"
     * - "2": "UserLog"
     * - "3": "AdminLog"
     * - "4": "SystemLog"
     */
    type logTypes = '1' | '2' | '3' | '4';

    /**
     * api method
     *
     * - "1": "GET"
     * - "2": "POST"
     * - "3": "PUT"
     * - "4": "PATCH"
     * - "5": "DELETE"
     */
    type logDetailTypes =
      | '1101'
      | '1102'
      | '1201'
      | '1202'
      | '1203'
      | '1211'
      | '1212'
      | '1213'
      | '1301'
      | '1302'
      | '1303'
      | '1311'
      | '1312'
      | '1313'
      | '1314'
      | '1315'
      | '1401'
      | '1402'
      | '1403'
      | '1404'
      | '1411'
      | '1412'
      | '1413'
      | '1414'
      | '1415'
      | '1501'
      | '1502'
      | '1503'
      | '1504'
      | '1505'
      | '1506'
      | '1507'
      | '1511'
      | '1512'
      | '1513'
      | '1514'
      | '1515'
      | '1601'
      | '1611'
      | '1612'
      | '1613'
      | '1614'
      | '1615';

    /** log */
    type Log = Common.CommonRecord<{
      /** log type */
      logType: logTypes;
      /** log user */
      logUser: string;
      /** log detail */
      logDetailType: logDetailTypes | null;
      /** request url */
      requestUrl: string;
      /** create time */
      createTime: string;
      /** create time */
      responseCode: string;
    }>;

    /** log add params */
    type LogAddParams = Pick<
      Api.SystemManage.Log,
      'logType' | 'logUser' | 'logDetailType' | 'requestUrl' | 'createTime' | 'responseCode'
    >;

    /** log update params */
    type LogUpdateParams = CommonType.RecordNullable<Pick<Api.SystemManage.Log, 'id'>> & Api.SystemManage.LogAddParams;

    /** log search params */
    type LogSearchParams = CommonType.RecordNullable<
      Pick<
        Api.SystemManage.Log,
        'logType' | 'logUser' | 'logDetailType' | 'requestUrl' | 'createTime' | 'responseCode'
      > &
      CommonSearchParams & { timeRange: string }
    >;

    /** log list */
    type LogList = Common.PaginatingQueryRecord<Log>;

    /**
     * user gender
     *
     * - "1": "male"
     * - "2": "female"
     * - "3": "unknow"
     */
    type UserGender = '1' | '2' | '3';

    /** user */
    type User = Common.CommonRecord<{
      /** user name */
      userName: string;
      /** password */
      password: string;
      /** user gender */
      userGender: UserGender | null;
      /** user nick name */
      nickName: string;
      /** user phone */
      userPhone: string;
      /** user email */
      userEmail: string;
      /** user role code collection */
      userRoles: string[];
    }>;

    /** user add params */
    type UserAddParams = Pick<
      Api.SystemManage.User,
      'userName' | 'password' | 'userGender' | 'nickName' | 'userPhone' | 'userEmail' | 'userRoles' | 'status'
    >;

    /** user update params */
    type UserUpdateParams = CommonType.RecordNullable<Pick<Api.SystemManage.User, 'id'>> & UserAddParams;

    /** user search params */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<
        Api.SystemManage.User,
        'userName' | 'password' | 'userGender' | 'nickName' | 'userPhone' | 'userEmail' | 'status'
      > &
      CommonSearchParams
    >;

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;

    /**
     * menu type
     *
     * - "1": directory
     * - "2": menu
     */
    type MenuType = '1' | '2';

    type MenuButton = {
      /**
       * button code
       *
       * it can be used to control the button permission
       */
      buttonCode: string;
      /** button description */
      buttonDesc: string;
    };

    /**
     * icon type
     *
     * - "1": iconify icon
     * - "2": local icon
     */
    type IconType = '1' | '2';

    type MenuPropsOfRoute = Pick<
      import('vue-router').RouteMeta,
      | 'i18nKey'
      | 'keepAlive'
      | 'constant'
      | 'order'
      | 'href'
      | 'hideInMenu'
      | 'activeMenu'
      | 'multiTab'
      | 'fixedIndexInTab'
      | 'query'
    >;

    type Menu = Common.CommonRecord<{
      /** parent menu id */
      parentId: number;
      /** menu type */
      menuType: MenuType;
      /** menu name */
      menuName: string;
      /** route name */
      routeName: string;
      /** route path */
      routePath: string;
      /** component */
      component?: string;
      /** iconify icon name or local icon name */
      icon: string;
      /** icon type */
      iconType: IconType;
      /** buttons */
      buttons?: MenuButton[] | null;
      /** children menu */
      children?: Menu[] | null;
    }> &
      MenuPropsOfRoute;

    /** menu add params */
    // type MenuAddParams = Pick<
    //   Api.SystemManage.Menu,
    //   | 'parentId'
    //   | 'menuType'
    //   | 'menuName'
    //   | 'routeName'
    //   | 'routePath'
    //   | 'component'
    //   | 'icon'
    //   | 'iconType'
    //   | 'buttons'
    //   | 'children'
    // >;
    type MenuAddParams = Pick<
      Api.SystemManage.Menu,
      | 'menuType'
      | 'menuName'
      | 'routeName'
      | 'routePath'
      | 'component'
      | 'order'
      | 'i18nKey'
      | 'icon'
      | 'iconType'
      | 'status'
      | 'parentId'
      | 'keepAlive'
      | 'constant'
      | 'href'
      | 'hideInMenu'
      | 'activeMenu'
      | 'multiTab'
      | 'fixedIndexInTab'
    > & {
      query: NonNullable<Api.SystemManage.Menu['query']>;
      buttons: NonNullable<Api.SystemManage.Menu['buttons']>;
      layout: string;
      page: string;
      pathParam: string;
    };

    /** menu update params */
    type MenuUpdateParams = CommonType.RecordNullable<Pick<Api.SystemManage.Menu, 'id'>> & MenuAddParams;

    /** menu list */
    type MenuList = Common.PaginatingQueryRecord<Menu>;

    type MenuTree = {
      id: number;
      label: string;
      pId: number;
      children?: MenuTree[];
    };

    type ButtonTree = {
      id: number;
      label: string;
      pId: number;
      children?: ButtonTree[];
    };

    /** 数据库 */
    type Database = Common.CommonRecord<{
      databaseName: string; /** 数据库名称 */
      databaseType: string; /** 数据库类型 */
      databaseHost: string; /** 数据库地址 */
      databasePort: number; /** 数据库端口 */
      databaseUser: string; /** 数据库用户名 */
      password: string; /** 数据库密码 */
      databaseDatabase: string; /** 数据库 */
      databaseDesc: string; /** 数据库描述 */
    }>;

    type DatabaseList = Common.PaginatingQueryRecord<Database>;

    /** 数据库搜索参数 */
    type DatabaseSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Database, 'databaseName' | 'databaseType' | 'createBy' | 'status'> & CommonSearchParams
    >;

    /** 数据库添加参数 */
    type DatabaseAddParams = Pick<Api.SystemManage.Database, 'databaseName' | 'databaseType' | 'databaseHost' | 'databasePort' | 'databaseUser' | 'password' | 'databaseDatabase' | 'databaseDesc' | 'createBy' | 'status'>;

    /** 数据库更新参数 */
    type DatabaseUpdateParams = CommonType.RecordNullable<Pick<Api.SystemManage.Database, 'id'>> & DatabaseAddParams;

    /** 数据库连接测试参数 */
    type DatabaseTestParams = CommonType.RecordNullable<Pick<Api.SystemManage.Database, 'id'>> & DatabaseAddParams;


    // 数据域
    type DataDomain = Common.CommonRecord<{
      dataDomainName: string; /** 数据域名称 */
      datadomainDesc: string; /** 数据域描述 */
    }>;

    type DataDomainList = Common.PaginatingQueryRecord<DataDomain>;

    /** 数据域搜索参数 */
    type DataDomainSearchParams = CommonType.RecordNullable<Pick<Api.SystemManage.DataDomain, 'dataDomainName' | 'createBy'> & CommonSearchParams>;

    /** 数据域添加参数 */
    type DataDomainAddParams = Pick<Api.SystemManage.DataDomain, 'dataDomainName' | 'datadomainDesc' | 'createBy'>;

    /** 数据域更新参数 */
    type DataDomainUpdateParams = CommonType.RecordNullable<Pick<Api.SystemManage.DataDomain, 'id'>> & DataDomainAddParams;

    // 主题域
    type TopicDomain = Common.CommonRecord<{
      topicDomainName: string; /** 主题域名称 */
      topicDomainDesc: string; /** 主题域描述 */
    }>;

    type TopicDomainList = Common.PaginatingQueryRecord<TopicDomain>;

    /** 主题域搜索参数 */
    type TopicDomainSearchParams = CommonType.RecordNullable<Pick<Api.SystemManage.TopicDomain, 'topicDomainName' | 'createBy'> & CommonSearchParams>;

    /** 主题域添加参数 */
    type TopicDomainAddParams = Pick<Api.SystemManage.TopicDomain, 'topicDomainName' | 'topicDomainDesc' | 'createBy'>;

    /** 主题域更新参数 */
    type TopicDomainUpdateParams = CommonType.RecordNullable<Pick<Api.SystemManage.TopicDomain, 'id'>> & TopicDomainAddParams;

    // 主题模型
    type DataModel = Common.CommonRecord<{
      dataModelName: string;
      dataModelDesc: string;
      sqlContent: string;
      dataDomain: string;
      topicDomain: string;
      database: string;
    }>

    type DataModelList = Common.PaginatingQueryRecord<DataModel>;

    /** 主题模型搜索参数 */
    type DataModelSearchParams = CommonType.RecordNullable<Pick<Api.SystemManage.DataModel, 'dataModelName' | 'dataDomain' | 'topicDomain' | 'createBy' | 'status'> & CommonSearchParams>;

    /** 主题模型添加参数 */
    type DataModelAddParams = Pick<Api.SystemManage.DataModel, 'dataModelName' | 'dataModelDesc' | 'sqlContent' | 'dataDomain' | 'topicDomain' | "database" | 'createBy' | 'status'>;

    /** 主题模型更新参数 */
    type DataModelUpdateParams = CommonType.RecordNullable<Pick<Api.SystemManage.DataModel, 'id'>> & DataModelAddParams;

    // 数据预览参数
    type DataPreviewSearchParams = CommonType.RecordNullable<{
      databaseId: number;
      tableName: string;
    } & CommonSearchParams>;



    type DataPreview = Common.CommonRecord<{
      id: number;
      [key: string]: any; // 允许任意其他字段
    }>

    type DataPreviewList = Common.PaginatingQueryRecord<DataPreview>;

    type Table = Common.CommonRecord<{
      tableName: string;
      tableComment: string;
    }>

    type TableList = Common.PaginatingQueryRecord<Table>;

    type TableSearchParams = { databaseId: number }
  }
}
