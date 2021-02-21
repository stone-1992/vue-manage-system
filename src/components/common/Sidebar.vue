<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.children">
                    <el-submenu :index="item.code" :key="item.incodedex">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-submenu
                                v-if="subItem.children"
                                :index="subItem.code"
                                :key="subItem.code"
                            >
                                <template slot="title">
                                    <i :class="subItem.icon"></i>
                                    <span slot="title">{{ subItem.name }}</span>
                                    <!-- {{ subItem.name }} -->
                                </template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.children"
                                    :key="i"
                                    :index="threeItem.code"
                                >
                                    <!-- {{ threeItem.name }} -->
                                <template slot="title">
                                    <i :class="threeItem.icon"></i>
                                    <span slot="title">{{ threeItem.name }}</span>
                                </template>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.code"
                                :key="subItem.code"
                            >
                            <!-- {{ subItem.name }} -->
                            <template slot="title">
                                    <i :class="subItem.icon"></i>
                                    <span slot="title">{{ subItem.name }}</span>
                            </template>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.code" :key="item.code">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
import {menus} from '../../utils/menus';
import {deletePostRequest,deleteParamRequest,getRequest,putRequest,postRequest} from '../../utils/index';
export default {
    data() {
        return {
            collapse: false,
            items: []
        };
    },
    computed: {
        onRoutes() {
            console.log("===================================");
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        console.log("======================开始获取菜单树===========================");
        // 获取菜单树
        this.getMenu();

        console.log(this.items)
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    },
    methods: {
        // 获取菜单树数据
        getMenu() {
            getRequest("user-center/menu/selectMenuTree",null).then(res => {
                console.log("-------------------------------------------------")
                this.items = res.data;
            });
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
