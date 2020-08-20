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
                <el-input v-model="query.keyword" placeholder="菜单名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="handleAdd" >新增</el-button>
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
                <el-table-column prop="name" label="菜单名称" align="center"></el-table-column>
                <el-table-column prop="code" label="菜单编码" align="center"></el-table-column>
                <el-table-column prop="parentId" label="上级ID" align="center" :formatter="menuFormat"></el-table-column>
                <el-table-column prop="status" label="是否启用" align="center" :formatter="statusFormat"></el-table-column>
                <el-table-column prop="url" label="url" align="center"></el-table-column>
                <el-table-column prop="icon" label="图标" align="center"></el-table-column>
                <el-table-column prop="layer" label="层级" align="center"></el-table-column>
                <el-table-column prop="remark" label="备注" align="center"></el-table-column>
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
               <el-form-item label="菜单名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="菜单编码" prop="code">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="上级ID" prop="parentId">
                    <!-- <el-input v-model="form.gender"></el-input> -->
                    <el-select v-model="form.parentId" placeholder="请选择">
                        <el-option
                            v-for="item in menus"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否启用" prop="status">
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option
                        v-for="item in status"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="跳转url" prop="url">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="icon">
                    <el-input v-model="form.icon"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="form.remark" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
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
                <el-form-item label="菜单名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="菜单编码" prop="code">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item label="上级ID" prop="parentId">
                    <!-- <el-tree :data="menus" @node-click="handleNodeClick"></el-tree> -->
                    <el-select v-model="form.parentId" placeholder="请选择">
                        <el-option
                        v-for="item in menus"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否启用" prop="status">
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option
                        v-for="item in status"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="跳转url" prop="url">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="icon">
                    <el-input v-model="form.icon"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.remark" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addPerson">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {deletePostRequest,deleteParamRequest,getRequest,putRequest,postRequest,getFileRequest} from '../../../api/index';
import {genders,nationCodes,status} from '../../../api/contants';
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
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            actionUrl:"http://localhost:8005/user-center/person/import",
            rules: {
                name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
                code: [{ required: true, message: '请输入菜单编码', trigger: 'blur' }],
                // parentId: [{ required: true, message: '请输入上级组织', trigger: 'blur' }],
                // url: [{ required: true, message: '请输入url', trigger: 'blur' }]
            },
            menus:[],
            status: status

            
        };
    },
    created() {
        this.getData();
        this.getMenu();
    },
    methods: {
        // 获取菜单数据
        getMenu() {
            getRequest("user-center/menu/selectMenuList",null).then(res => {
                this.menus = res.data;
            });
        },
        // 获取用户列表数据
        getData() {
            getRequest("user-center/menu/selectMenuByPage",this.query).then(res => {
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
                    deleteParamRequest('user-center/menu/deleteMenu', row).then(res => {
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
        // 多选删除操作
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = [];
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str.push(this.multipleSelection[i].id);
            }
            let query = {ids:str};
            deletePostRequest('user-center/menu/deleteMenuBath', query).then(res => {
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
            // 获取菜单信息
            this.getMenu();

            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.editVisible = false;
                    putRequest('user-center/menu/updateMenu', this.form).then(res => {
                        if(res.result){
                            this.$message.success('更新成功');
                            this.getData();
                        }else{
                            this.$message.error(res.resultDesc);
                        }
                    });
                    this.$set(this.tableData, this.idx, this.form);

                    // 清空表单数据
                    this.form = {};
                } else {
                    return false;
                }
            });
            
        },
        // 新增操作
        handleAdd() {
            // 获取菜单信息
            this.getMenu();
            
            this.addVisible = true;
        },
        // 新增保存
        addPerson() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    postRequest('user-center/menu/addMenu', this.form).then(res => {
                        if(res.result){
                            this.$message.success('新增成功');
                            this.addVisible = false;
                            this.getData();

                            // 清空表单数据
                            this.form = {};
                        }else{
                            this.$message.error(res.resultDesc);
                        }
                     });
                } else {
                    return false;
                }
            });
            
        },
        // 列表页性别转换
        menuFormat(row, column){
            for(let i = 0; i < this.menus.length; i++){
                let menu = this.menus[i];
                if(row.parentId == menu.id){
                    return menu.name;
                }
            }
        },
        // 是否启用转换
        statusFormat(row, column){
            for(let i = 0; i < this.status.length; i++){
                let st = this.status[i];
                if(row.status == st.value){
                    return st.label;
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
