angular.module('servData', []).factory(
  'getTotalDevices', ['$http', '$rootScope',
  function($http, $rootScope) {
    return function(condition, onSuccess){

      var general_condition = "单价>=100000 and (使用方向 = '教学' or 使用方向 = '科研') and 结束日期 = '3000%2F1%2F1' AND " + condition;

      var query = $rootScope.host + 'api/querytotal/'+$rootScope.db+'/'+$rootScope.devices_table+'/'+general_condition;
      $http.get(query, { cache: false }).then(function(data){
        onSuccess(data);
      });
    }
  }]
).factory(
  'getDevices', ['$http', '$rootScope',
  function($http, $rootScope) {
    return function(condition,from_num,to_num,onSuccess){

      var general_condition = "单价>=100000 AND (使用方向 = '教学' OR 使用方向 = '科研') and 结束日期 = '3000%2F1%2F1' AND " + condition;

      var query = $rootScope.host + 'api/query/'+$rootScope.db+'/'+$rootScope.devices_table+'/a.设备代码/a.设备代码 as no, a.部门代码 as dept_no, a.设备名称 as name,a.设备分类名称 as catagory,a.型号 as version,a.规格 as size,a.部门名称 as department,a.领用人 as contact,b.责任领用人联系电话 as phone,a.管理人 as manager,a.存放地点 as location/'+from_num+'/'+to_num+'/'+general_condition;
      $http.get(query, { cache: false }).then(function(data){
        onSuccess(data);
      });
    }
  }]
).factory(
  'getDepartments', ['$http', '$rootScope',
  function($http, $rootScope) {
    return function(condition,onSuccess){

      var general_condition = "有效标志=1 AND " + condition;

      var query = $rootScope.host + 'api/query/'+$rootScope.db+'/'+$rootScope.department_table+'/部门编码/部门编码 as dept_no, 级别 as level, 父编码 as parent_no, 部门名称 as dept_name,有效标志 as is_active, 教育部上报标志 as is_reported,URPID, 财务编码 as finance_no, 资产编码 as asset_no, 部门性质 as dept_type, 备注 as comments/'+1+'/'+999999+'/'+general_condition;
      $http.get(query, { cache: false }).then(function(data){
        onSuccess(data);
      });
    }
  }]
).factory(
  'getDevice', ['$http', '$rootScope',
  function($http, $rootScope) {
    return function(device_no, onSuccess){
      var query = $rootScope.host + 'api/query/'+$rootScope.db+'/'+$rootScope.devices_table+'/a.设备代码/a.设备代码 as no, a.无形资产标志 as invi_flag, a.安检设备标志 as safety_flag, a.车辆标志 as car_falg, a.进口设备标志 as import_flag, a.大型仪器设备标志 as large_flag, 附件标志 attachment_flag, a.开始日期 as start_date, a.结束日期 as end_date, a.设备名称 as name, a.标签号 as tag_no, a.型号 as version, a.规格 as size, a.单价 as price, a.数量 as quantity, a.原值 as orig_price, a.状态 as status, a.验收单代码 as check_no, a.建账设备代码 as contruct_no, a.国别 as nationality, a.分类系统码 as cat_sys_no, a.项目 as project, a.设备来源 as source, a.资产性质 as property, a.厂家 as made_in, a.出厂日期 as product_date, a.供货商 as supplier, a.购置日期 as purchase_date, a.主要附件 as attachment, a.合同号 as contract_no, a.经费来源 as funding_source, a.使用方向 as purpose, a.建账人 as accountant, a.建账日期 as accounting_date, a.部门代码 as dept_no, a.领用人代码 as user_no, a.领用人 as user_name, a.管理人代码 as manager_no, a.管理人 as manager_name, a.存放地点 as storage, a.保修期 as warranty, a.使用年限 as date_limit, a.备注 as comments, a.车辆类型 as car_type, a.车牌号 as car_no, a.排量 as engine, a.发动机号 as engine_no, a.车架号 as frame_no, a.权属证书号码 as certificate_no, a.权属证书发证日期 as certificate_date, a.权属证书持证人 as certificate_owner, a.编制情况 as manner, a.核定载客数 as capacoty, a.车辆识别号码 as car_recognition, a.海关监管设备标志 as export_sign, a.外币金额 as foreign_currency , a.外币种类 as currenty_type, a.报关单号 as export_no, a.商检证号 as export_check_no, a.免税表号 as tax_free_no, 监管期 manage_date, a.折旧日期 as decay_date, a.折旧结束日期 as decay_end_date , a.月折旧 as monthly_decay, a.累计折旧 as total_decay, a.处理类型 as processing_type, a.处理内容 as processing_context, a.设备分类代码 as device_type_no, a.设备分类名称 as device_type_name, a.十大类分类代码 as ten_cate_no, a.十大类分类名称 as ten_cate_name, a.十大类大类代码 as ten_cate_class_no, a.十大类大类名称 as ten_cate_class_name , a.六大类分类代码 as six_cate_no , a.六大类分类名称 as six_cate_name , a.六大类大类代码 as six_cate_class_no , a.六大类大类名称 as six_cate_class_name , a.部门名称 as dept_name , a.校区 as campus , a.联系电话 as contact, a.功率 as output, a.URPID as urpidl, a.入账部门 as record_dept , a.估价值 as value_price, a.注册登记日期 as register_date, a.注册登记机关 as register_dept, a.批准文号 as allowance_no, a.专利号 as patent, a.教育部上报标志 as edu_flag, a.国别码 as country_reg_no/'+1+'/'+2+'/'+"a.设备代码 = '"+device_no+"'";
      $http.get(query, { cache: false }).then(function(data){
        onSuccess(data);
      });
    }
  }]
);

//


//  设备代码 as no, 无形资产标志 as invi_flag, 安检设备标志 as safety_flag, 车辆标志 as car_falg, 进口设备标志 as import_flag, 大型仪器设备标志 as large_flag, 附件标志 attachment_flag, 开始日期 as start_date, 结束日期 as end_date, 设备名称 as name, 标签号 as tag_no, 型号 as version, 规格 as size, 单价 as price, 数量 as quantity, 原值 as orig_price, 状态 as status, 验收单代码 as check_no, 建账设备代码 as contruct_no, 国别 as nationality, 分类系统码 as cat_sys_no, 项目 as project, 设备来源 as source, 资产性质 as property, 厂家 as made_in, 出厂日期 as product_date, 供货商 as supplier, 购置日期 as purchase_date, 主要附件 as attachment, 合同号 as contract_no, 经费来源 as funding_source, 使用方向 as purpose, 建账人 as accountant, 建账日期 as accounting_date, 部门代码 as dept_no, 领用人代码 as user_no, 领用人 as user_name, 管理人代码 as manager_no, 管理人 as manager_name, 存放地点 as storage, 保修期 as warranty, 使用年限 as date_limit, 备注 as comments, 车辆类型 as car_type, 车牌号 as car_no, 排量 as engine, 发动机号 as engine_no, 车架号 as frame_no, 权属证书号码 as certificate_no, 权属证书发证日期 as certificate_date, 权属证书持证人 as certificate_owner, 编制情况 as manner, 核定载客数 as capacoty, 车辆识别号码 as car_recognition, 海关监管设备标志 as export_sign, 外币金额 as foreign_currency , 外币种类 as currenty_type, 报关单号 as export_no, 商检证号 as export_check_no, 免税表号 as tax_free_no, 监管期 manage_date, 折旧日期 as decay_date, 折旧结束日期 as decay_end_date , 月折旧 as monthly_decay, 累计折旧 as total_decay, 处理类型 as processing_type, 处理内容 as processing_context, 设备分类代码 as device_type_no, 设备分类名称 as device_type_name, 十大类分类代码 as ten_cate_no, 十大类分类名称 as ten_cate_name, 十大类大类代码 as ten_cate_class_no, 十大类大类名称 as ten_cate_class_name , 六大类分类代码 as six_cate_no , 六大类分类名称 as six_cate_name , 六大类大类代码 as six_cate_class_no , 六大类大类名称 as six_cate_class_name , 部门名称 as dept_name , 校区 as campus , 联系电话 as contact, 功率 as output, URPID as urpidl, 入账部门 as record_dept , 估价值 as value_price, 注册登记日期 as register_date, 注册登记机关 as register_dept, 批准文号 as allowance_no, 专利号 as patent, 教育部上报标志 as edu_flag, 国别码 as country_reg_no
