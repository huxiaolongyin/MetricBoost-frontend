import { request } from '../request';

/** get role list */
export function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/system-manage/roles',
    method: 'get',
    params
  });
}

/** get user list */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/system-manage/users',
    method: 'get',
    params
  });
}

/** get menu list */
export function fetchGetMenuList() {
  return request<Api.SystemManage.MenuList>({
    url: '/system-manage/menus',
    method: 'get'
  });
}

/** get all pages */
export function fetchGetAllPages() {
  return request<string[]>({
    url: '/system-manage/menus/pages/',
    method: 'get'
  });
}

/** get menu tree */
export function fetchGetMenuTree() {
  return request<Api.SystemManage.MenuTree[]>({
    url: '/system-manage/menus/tree/',
    method: 'get'
  });
}

/** get menu button tree */
export function fetchGetMenuButtonTree() {
  return request<Api.SystemManage.ButtonTree[]>({
    url: '/system-manage/menus/buttons/tree/',
    method: 'get'
  });
}

/** get log list */
export function fetchGetLogList(params?: Api.SystemManage.LogSearchParams) {
  return request<Api.SystemManage.LogList>({
    url: '/system-manage/logs',
    method: 'get',
    params
  });
}

/** delete log */
export function fetchDeleteLog(data?: Api.SystemManage.CommonDeleteParams) {
  return request<Api.SystemManage.LogList>({
    url: `/system-manage/logs/${data?.id}`,
    method: 'delete'
  });
}

export function fetchBatchDeleteLog(data?: Api.SystemManage.CommonBatchDeleteParams) {
  return request<Api.SystemManage.LogList>({
    url: '/system-manage/logs',
    method: 'delete',
    params: { ids: data?.ids.join(',') }
  });
}
/** update log */
export function fetchUpdateLog(data?: Api.SystemManage.LogUpdateParams) {
  return request<Api.SystemManage.LogList, 'json'>({
    url: `/system-manage/logs/${data?.id}`,
    method: 'patch',
    data
  });
}

/** get api tree */
export function fetchGetApiTree() {
  return request<Api.SystemManage.MenuTree[]>({
    url: '/system-manage/apis/tree/',
    method: 'get'
  });
}

/** refresh api from fastapi */
export function fetchRefreshAPI() {
  return request<Api.SystemManage.ApiList>({
    url: '/system-manage/apis/refresh/',
    method: 'post'
  });
}

/** get api list */
export function fetchGetApiList(params?: Api.SystemManage.ApiSearchParams) {
  return request<Api.SystemManage.ApiList>({
    url: '/system-manage/apis',
    method: 'get',
    params
  });
}

/** add api */
export function fetchAddApi(data?: Api.SystemManage.ApiAddParams) {
  return request<Api.SystemManage.ApiList, 'json'>({
    url: '/system-manage/apis',
    method: 'post',
    data
  });
}

/** delete api */
export function fetchDeleteApi(data?: Api.SystemManage.CommonDeleteParams) {
  return request<Api.SystemManage.ApiList>({
    url: `/system-manage/apis/${data?.id}`,
    method: 'delete'
  });
}

export function fetchBatchDeleteApi(data?: Api.SystemManage.CommonBatchDeleteParams) {
  return request<Api.SystemManage.ApiList>({
    url: '/system-manage/apis',
    method: 'delete',
    params: { ids: data?.ids.join(',') }
  });
}
/** update api */
export function fetchUpdateApi(data?: Api.SystemManage.ApiUpdateParams) {
  return request<Api.SystemManage.ApiList, 'json'>({
    url: `/system-manage/apis/${data?.id}`,
    method: 'patch',
    data
  });
}

/** add user */
export function fetchAddUser(data?: Api.SystemManage.UserAddParams) {
  return request<Api.SystemManage.UserList, 'json'>({
    url: '/system-manage/users',
    method: 'post',
    data
  });
}

/** delete user */
export function fetchDeleteUser(data?: Api.SystemManage.CommonDeleteParams) {
  return request<Api.SystemManage.UserList>({
    url: `/system-manage/users/${data?.id}`,
    method: 'delete'
  });
}

export function fetchBatchDeleteUser(data?: Api.SystemManage.CommonBatchDeleteParams) {
  return request<Api.SystemManage.UserList>({
    url: '/system-manage/users',
    method: 'delete',
    params: { ids: data?.ids.join(',') }
  });
}
/** update user */
export function fetchUpdateUser(data?: Api.SystemManage.UserUpdateParams) {
  return request<Api.SystemManage.UserList, 'json'>({
    url: `/system-manage/users/${data?.id}`,
    method: 'patch',
    data
  });
}

/** add role */
export function fetchAddRole(data?: Api.SystemManage.RoleUpdateParams) {
  return request<Api.SystemManage.RoleList, 'json'>({
    url: '/system-manage/roles',
    method: 'post',
    data
  });
}

/** delete role */
export function fetchDeleteRole(data?: Api.SystemManage.CommonDeleteParams) {
  return request<Api.SystemManage.RoleList>({
    url: `/system-manage/roles/${data?.id}`,
    method: 'delete'
  });
}

export function fetchBatchDeleteRole(data?: Api.SystemManage.CommonBatchDeleteParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/system-manage/roles',
    method: 'delete',
    params: { ids: data?.ids.join(',') }
  });
}

/** update role */
export function fetchUpdateRole(data?: Api.SystemManage.RoleUpdateParams) {
  return request<Api.SystemManage.RoleList, 'json'>({
    url: `/system-manage/roles/${data?.id}`,
    method: 'patch',
    data
  });
}

/** get role menu ids */
export function fetchGetRoleMenu(data?: Api.SystemManage.RoleAuthorizedParams) {
  return request<Api.SystemManage.RoleAuthorizedList>({
    url: `/system-manage/roles/${data?.id}/menus`,
    method: 'get'
  });
}

/** update role menu ids */
export function fetchUpdateRoleMenu(data?: Api.SystemManage.RoleAuthorizedList) {
  return request<Api.SystemManage.RoleAuthorizedList>({
    url: `/system-manage/roles/${data?.id}/menus`,
    method: 'patch',
    data
  });
}

/** get role button ids */
export function fetchGetRoleButton(data?: Api.SystemManage.RoleAuthorizedParams) {
  return request<Api.SystemManage.RoleAuthorizedList>({
    url: `/system-manage/roles/${data?.id}/buttons`,
    method: 'get'
  });
}

/** update role button ids */
export function fetchUpdateRoleButton(data?: Api.SystemManage.RoleAuthorizedList) {
  return request<Api.SystemManage.RoleAuthorizedList>({
    url: `/system-manage/roles/${data?.id}/buttons`,
    method: 'patch',
    data
  });
}

/** get role api ids */
export function fetchGetRoleApi(data?: Api.SystemManage.RoleAuthorizedParams) {
  return request<Api.SystemManage.RoleAuthorizedList>({
    url: `/system-manage/roles/${data?.id}/apis`,
    method: 'get'
  });
}

/** update role api ids */
export function fetchUpdateRoleApi(data?: Api.SystemManage.RoleAuthorizedList) {
  return request<Api.SystemManage.RoleAuthorizedList>({
    url: `/system-manage/roles/${data?.id}/apis`,
    method: 'patch',
    data
  });
}

/** add menu */
export function fetchAddMenu(data?: Api.SystemManage.MenuAddParams) {
  return request<Api.SystemManage.MenuList, 'json'>({
    url: '/system-manage/menus',
    method: 'post',
    data
  });
}

/** delete menu */
export function fetchDeleteMenu(data?: Api.SystemManage.CommonDeleteParams) {
  return request<Api.SystemManage.MenuList>({
    url: `/system-manage/menus/${data?.id}`,
    method: 'delete'
  });
}

export function fetchBatchDeleteMenu(data?: Api.SystemManage.CommonBatchDeleteParams) {
  return request<Api.SystemManage.MenuList>({
    url: '/system-manage/menus',
    method: 'delete',
    params: { ids: data?.ids.join(',') }
  });
}

/** update menu */
export function fetchUpdateMenu(data?: Api.SystemManage.MenuUpdateParams) {
  return request<Api.SystemManage.MenuList, 'json'>({
    url: `/system-manage/menus/${data?.id}`,
    method: 'patch',
    data
  });
}

// 获取数据库
export function fetchDatabaseList(params?: Api.SystemManage.DatabaseSearchParams) {
  return request<Api.SystemManage.DatabaseList>({
    url: '/system-manage/databases',
    method: 'get',
    params
  });
}

// 添加数据库
export function fetchAddDatabase(data?: Api.SystemManage.DatabaseAddParams) {
  return request<Api.SystemManage.DatabaseList, 'json'>({
    url: '/system-manage/databases',
    method: 'post',
    data
  });
}

// 更新数据库
export function fetchUpdateDatabase(data?: Api.SystemManage.DatabaseUpdateParams) {
  return request<Api.SystemManage.DatabaseList, 'json'>({
    url: `/system-manage/databases/${data?.id}`,
    method: 'patch',
    data
  });
}

// 删除数据库
export function fetchDeleteDatabase(data?: Api.SystemManage.CommonDeleteParams) {
  return request<Api.SystemManage.DatabaseList>({
    url: `/system-manage/databases/${data?.id}`,
    method: 'delete'
  });
}

// 测试数据库连接
export function fetchTestDatabase(data?: Api.SystemManage.DatabaseTestParams) {
  const params = new URLSearchParams();
  if (data?.id) {
    params.append('database_id', data?.id.toString());
  }
  return request<Api.SystemManage.DatabaseList>({
    url: `/system-manage/databases/test${params.toString() ? `?${params.toString()}` : ''}`,
    method: 'post',
    data
  });
}


// 获取数据域信息
export function fetchGetDataDomainList(params?: Api.SystemManage.DomainSearchParams) {
  return request<Api.SystemManage.DomainList>({
    url: '/system-manage/data-domain',
    method: 'get',
    params
  });
}

// 添加数据域信息
export function fetchAddDataDomain(data?: Api.SystemManage.DomainAddParams) {

  return request<Api.SystemManage.DomainList, 'json'>({
    url: '/system-manage/data-domain',
    method: 'post',
    data
  });
}

// 更新数据域信息
export function fetchUpdateDataDomain(data?: Api.SystemManage.DomainUpdateParams) {
  return request<Api.SystemManage.DomainList, 'json'>({
    url: `/system-manage/data-domain/${data?.id}`,
    method: 'patch',
    data
  });
}

// 删除数据域信息
export function fetchDeleteDataDomain(data?: Api.SystemManage.CommonDeleteParams) {
  return request<Api.SystemManage.DomainList>({
    url: `/system-manage/data-domain/${data?.id}`,
    method: 'delete'
  });
}

// 获取主题域信息
export function fetchGetTopicDomainList(params?: Api.SystemManage.DomainSearchParams) {
  return request<Api.SystemManage.DomainList>({
    url: '/system-manage/topic-domain',
    method: 'get',
    params
  });
}

// 添加主题域信息
export function fetchAddTopicDomain(data?: Api.SystemManage.DomainAddParams) {
  return request<Api.SystemManage.DomainList, 'json'>({
    url: '/system-manage/topic-domain',
    method: 'post',
    data
  });
}

// 更新主题域信息
export function fetchUpdateTopicDomain(data?: Api.SystemManage.DomainUpdateParams) {
  return request<Api.SystemManage.DomainList, 'json'>({
    url: `/system-manage/topic-domain/${data?.id}`,
    method: 'patch',
    data
  });
}

// 删除主题域信息
export function fetchDeleteTopicDomain(data?: Api.SystemManage.CommonDeleteParams) {
  return request<Api.SystemManage.DomainList>({
    url: `/system-manage/topic-domain/${data?.id}`,
    method: 'delete'
  });
}

// 获取主题数据模型
export function fetchDataModelList(params?: Api.SystemManage.DataModelSearchParams) {
  return request<Api.SystemManage.DataModelList>({
    url: '/system-manage/data-model',
    method: 'get',
    params
  });
}

// 添加主题数据模型
export function fetchAddDataModel(data?: Api.SystemManage.DataModelAddParams) {
  return request<Api.SystemManage.DataModelList, 'json'>({
    url: '/system-manage/data-model',
    method: 'post',
    data
  });
}

// 更新主题数据模型
export function fetchUpdateDataModel(data?: Api.SystemManage.DataModelUpdateParams) {
  return request<Api.SystemManage.DataModelList, 'json'>({
    url: `/system-manage/data-model/${data?.id}`,
    method: 'patch',
    data
  });
}

// 删除主题数据模型
export function fetchDeleteDataModel(data?: Api.SystemManage.CommonDeleteParams) {
  return request<Api.SystemManage.DataModelList>({
    url: `/system-manage/data-model/${data?.id}`,
    method: 'delete'
  });
}

// 通过数据库、sql获取数据预览
export function fetchDataPreview(params?: Api.SystemManage.DataPreviewSearchParams) {
  return request<Api.SystemManage.DataPreviewList>({
    url: '/system-manage/data-model/data-preview',
    method: 'get',
    params
  });
}

// 获取数据表信息
export function fetchGetTableList(params?: Api.SystemManage.TableSearchParams) {
  return request<Api.SystemManage.TableList>({
    url: '/system-manage/data-model/tables',
    method: 'get',
    params
  });
}

// 获取数据表的字段信息
export function fetchGetTableColumns(params?: Api.SystemManage.TableColumnsSearchParams) {
  return request<Api.SystemManage.TableColumnsList>({
    url: '/system-manage/data-model/tables/columns',
    method: 'get',
    params
  });
}