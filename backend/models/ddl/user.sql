-- 用户表
CREATE TABLE `user`
(
    `username`           varchar(255) NOT NULL COMMENT '用户帐号',
    `password`           varchar(255) NOT NULL COMMENT '用户密码',
    `nick_name`          varchar(255) DEFAULT NULL COMMENT '用户昵称',
    `user_mobile`        varchar(128) NOT NULL COMMENT '用户电话号码',
    `user_email`         varchar(128) DEFAULT NULL COMMENT '用户电子邮箱',
    `user_origin`        varchar(255) DEFAULT NULL COMMENT '用户注册来源',
    `is_active`          tinyint(1) DEFAULT NULL COMMENT '是否激活',
    `id`                 int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `create_record_time` datetime     DEFAULT NULL COMMENT '记录创建时间',
    `update_record_time` datetime     DEFAULT NULL COMMENT '记录更新时间',
    `delete_record_time` datetime     DEFAULT NULL COMMENT '记录删除时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 新建用户
INSERT INTO `ai_education`.`user` (`username`, `password`, `nick_name`, `user_mobile`, `user_email`, `user_origin`, `is_active`, `id`, `create_record_time`, `update_record_time`, `delete_record_time`) VALUES ('dengshuai', 'qwer1234', '邓帅', '18222890650', 'dengshuai37@163.com', NULL, 1, 1, '2025-08-18 15:22:43', '2025-08-18 15:22:43', NULL);