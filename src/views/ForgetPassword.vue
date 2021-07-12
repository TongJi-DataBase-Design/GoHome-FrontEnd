<!--
    找回密码页面
    by：汪明杰
-->

<template>
    <div>
        <div style="
        width: 50%;
        margin-left: 25%;
        margin-top:5%;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        ">
            <el-steps :active="1"
            style="
            margin-left: 5%;
            margin-right: 5%;
            margin-top: 5%;
            ">
                <el-step title="手机号验证" icon="el-icon-edit"></el-step>
                <el-step title="找回成功" icon="el-icon-upload"></el-step>
            </el-steps>
        </div>
    </div>
</template>
