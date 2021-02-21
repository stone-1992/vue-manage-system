<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-input v-model="query.keyword" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="handleAdd" >新增</el-button>
                <el-button type="primary" @click="importHander" >导入员工<i class="el-icon-upload el-icon--right"></i></el-button>
                <el-button type="primary" icon="el-icon-download" @click="template">下载模板</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="personName" label="员工姓名" align="center"></el-table-column>
                <el-table-column prop="mobile" label="手机号码" align="center"></el-table-column>
                <el-table-column prop="gender" label="员工性别" :formatter="genderFormat"></el-table-column>
                <el-table-column prop="cardNumber" label="员工卡号"></el-table-column>
                <el-table-column prop="entryDate" label="入职日期"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="nationCode" label="名族代码" :formatter="nationCodeFormat"></el-table-column>
                <el-table-column prop="nativePlace" label="籍贯"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageNo"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
               <el-form-item label="员工姓名" prop="personName">
                    <el-input v-model="form.personName"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item label="员工性别" prop="gender">
                    <!-- <el-input v-model="form.gender"></el-input> -->
                    <el-select v-model="form.gender" placeholder="请选择">
                        <el-option
                            v-for="item in genders"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="员工卡号" prop="cardNumber">
                    <el-input v-model="form.cardNumber"></el-input>
                </el-form-item>
                <el-form-item label="入职日期" prop="entryDate">
                    <!-- <el-input v-model="form.entryDate"></el-input> -->
                    <el-date-picker v-model="form.entryDate" type="date" placeholder="选择入职日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="form.age"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="名族代码" prop="nationCode">
                    <!-- <el-input v-model="form.nationCode"></el-input> -->
                    <el-select v-model="form.nationCode" placeholder="请选择">
                        <el-option
                            v-for="item in nationCodes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="籍贯" prop="nativePlace">
                    <el-input v-model="form.nativePlace"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>


         <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="员工姓名" prop="personName">
                    <el-input v-model="form.personName"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item label="员工性别">
                    <!-- <el-input v-model="form.gender"></el-input> -->
                    <el-select v-model="form.gender" placeholder="请选择">
                        <el-option
                            v-for="item in genders"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="员工卡号" prop="cardNumber">
                    <el-input v-model="form.cardNumber"></el-input>
                </el-form-item>
                <el-form-item label="入职日期" prop="entryDate">
                    <!-- <el-input v-model="form.entryDate"></el-input> -->
                    <el-date-picker v-model="form.entryDate" type="date" placeholder="选择入职日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="form.age"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="名族代码">
                    <!-- <el-input v-model="form.nationCode"></el-input> -->
                    <el-select v-model="form.nationCode" placeholder="请选择">
                        <el-option
                            v-for="item in nationCodes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="籍贯">
                    <el-input v-model="form.nativePlace"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addPerson">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 导入员工弹出框 -->
        <el-dialog title="导入员工" :visible.sync="importUserVisible" width="30%">
            <el-upload
              :action="actionUrl"
              class="upload-demo"
              :multiple="false"
              name="file"
              ref="upload"
              :file-list="fileList"
              accept=".csv,.xls,.xlsx"
              :auto-upload="false"
              :on-success="uploadSuccess"
              :limit="1"
            >
        　　<el-button slot="trigger" size="small">选取文件</el-button>
        　　<el-button style="margin-left: 10px;" size="small"  type="primary" @click="submitUpload">上传到服务器</el-button>
        　　<div slot="tip" class="el-upload__tip">只能上传csv/xslx/xsl文件，且不超过1M</div>
        </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="importUserVisible = false">取 消</el-button>
                <!-- <el-button type="primary" @click="importUser">确 定</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {deletePostRequest,deleteParamRequest,getRequest,putRequest,postRequest,getFileRequest} from '../../../utils';
import {genders,nationCodes} from '../../../utils/contants';
import request from '../../../utils/request';
export default {
    name: 'basetable',
    
    data() {
        return {
            query: {
                keyword: '',
                pageNo: 1,
                pageSize: 15
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            importUserVisible:false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            actionUrl:"http://localhost:8005/user-center/person/import",
            genders:genders,
            nationCodes:nationCodes,
            rules: {
                personName: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
                mobile: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
                cardNumber: [{ required: true, message: '请输入员工卡号', trigger: 'blur' }],
                entryDate: [{ required: true, message: '请输入入职日期', trigger: 'blur' }],
                age: [
                    { required: true, message: '请输入年龄', trigger: 'blur' },
                    { type: 'number', message: '年龄必须为数字值', trigger: 'blur'}
                ],
            }

            
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取用户列表数据
        getData() {
            getRequest("user-center/person/selectPersonByPage",this.query).then(res => {
                this.tableData = res.data;
                this.pageTotal = res.pageBean.pageDataCount;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageNo', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                    deleteParamRequest('user-center/person/deletePerson', row).then(res => {
                        if(res.result){
                            this.$message.success('删除成功');
                            this.getData();
                        }else{
                            this.$message.error(res.resultDesc);
                        }
                    });
                }).catch(() => {
                    
                });
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = [];
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str.push(this.multipleSelection[i].id);
            }
            let query = {ids:str};
            deletePostRequest('user-center/person/deletePersonBath', query).then(res => {
                if(res.result){
                    this.$message.success('批量删除成功');
                    this.getData();
                }else{
                    this.$message.error(res.resultDesc);
                }
            });
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.editVisible = false;
                    putRequest('user-center/person/updatePerson', this.form).then(res => {
                        if(res.result){
                            this.$message.success('更新成功');
                            this.getData();
                        }else{
                            this.$message.error(res.resultDesc);
                        }
                    });
                    this.$set(this.tableData, this.idx, this.form);
                } else {
                    return false;
                }
            });
            
        },
        // 新增操作
        handleAdd() {
           this.addVisible = true;
        },
        // 新增保存
        addPerson() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    postRequest('user-center/person/addPerson', this.form).then(res => {
                        if(res.result){
                            this.$message.success('新增成功');
                            this.addVisible = false;
                            this.getData();
                        }else{
                            this.$message.error(res.resultDesc);
                        }
                     });
                } else {
                    return false;
                }
            });
            
        },
        // 导入用户
        importHander(){
            this.importUserVisible = true;
        },
        importUser(){
            this.importUserVisible = false;
        },
        // 下载模板
        template(){
            getFileRequest('user-center/person/template',null).then(res =>{
                        console.log(res)
                        let data = res;
                        if (!data) {
                            this.$message.error('下载失败，解析数据为空！');
                            return
                        }
                        // const datetime = Date.now();
                        // 创建一个新的url，此url指向新建的Blob对象
                        let url = window.URL.createObjectURL(new Blob([data],{type: 'application/vnd.ms-excel'}))
                        // 创建a标签，并隐藏改a标签
                        let link = document.createElement('a')
                        link.style.display = 'none'
                        // a标签的href属性指定下载链接
                        link.href = url
                        //setAttribute() 方法添加指定的属性，并为其赋指定的值。
                        let fileName = '购买明细表.xlsx'
                        link.setAttribute('download', fileName )
                        document.body.appendChild(link)
                        link.click()
                        this.$Message.info('导出成功');
                        this.modal3 = false;       
            });
        },
        submitUpload(){
            let res = this.$refs.upload.submit();
            this.importUserVisible = false;
        },
        // 文件上传成功
        uploadSuccess(res, file, fileList){
            if(res.result){
                // 重新加载列表数据
                this.getData();
                this.$message.success('导入员工成功');
            }else{
                this.$message.error(res.resultDesc);
            }
        },
        // 列表页性别转换
        genderFormat(row, column){
            for(let i = 0; i < this.genders.length; i++){
                let gender = this.genders[i];
                if(row.gender == gender.value){
                    return gender.label;
                }
            }
        },
        // 列表名族代码转换
        nationCodeFormat(row, column){
            for(let i = 0; i < this.nationCodes.length; i++){
                let nationCode = this.nationCodes[i];
                if(row.nationCode == nationCode.value){
                    return nationCode.label;
                }
            }
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageNo', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.upload-text{
    width: 100px;
    height: 40px;
    border: 0px;
}

/* 覆盖 up-load 的样式，框框去掉 */
.upload-demo /deep/ .el-upload--text{
    width: 100px;
    height: 40px;
    border: 0px;
    overflow: inherit;
}
 
</style>
