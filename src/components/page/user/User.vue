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
                <el-button type="primary" @click="handleAdd" style="margin-right:200px">新增</el-button>
                <el-button type="primary" @click="importHander" style="margin-right:200px">导入用户</el-button>
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
                <el-table-column prop="userId" label="用户id" align="center"></el-table-column>
                <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
                <el-table-column prop="accountNo" label="账号"></el-table-column>
                <el-table-column prop="accountPwd" label="密码"></el-table-column>
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
            <el-form ref="form" :model="form" label-width="70px">
               <el-form-item label="用户id">
                    <el-input v-model="form.userId"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="form.accountNo"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.accountPwd"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>


         <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户id">
                    <el-input v-model="form.userId"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="form.accountNo"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.accountPwd"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 导入用户弹出框 -->
        <el-dialog title="新增" :visible.sync="importUserVisible" width="30%">
                
            <span slot="footer" class="dialog-footer">
                <el-button @click="importUserVisible = false">取 消</el-button>
                <el-button type="primary" @click="importUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData,addUser,deleteUser,deleteRequest,getRequest,putRequest } from '../../../api/index';
import request from '../../../utils/request';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                keyword: '',
                pageNo: 1,
                pageSize: 10
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
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取用户列表数据
        getData() {
            getRequest("user-center/user/selectUserAuthPage",this.query).then(res => {
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
            })
                .then(() => {
                    deleteRequest('user-center/user/deleteUserAuth', row).then(res => {
                        if(res.result){
                            this.$message.success('删除成功');
                            this.getData();
                        }else{
                            this.$message.error(res.resultDesc);
                        }
                    });
                })
                .catch(() => {});
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
            deleteRequest('user-center/user/deleteAuthUserBath', query).then(res => {
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
            this.editVisible = false;
            putRequest('user-center/user/updateUserAuth', this.form).then(res => {
                if(res.result){
                    this.$message.success('更新成功');
                    this.getData();
                }else{
                    this.$message.error(res.resultDesc);
                }
            });
            this.$set(this.tableData, this.idx, this.form);
        },
        // 新增操作
        handleAdd() {
           this.addVisible = true;
        },
        // 保存编辑
        addUser() {
            addUser(this.form).then(res => {
                if(res.result){
                    this.addVisible = false;
                    this.getData();
                    this.$message.success(`操作成功`);                   
                }else{
                    this.$message.error(res.resultDesc);
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
</style>
