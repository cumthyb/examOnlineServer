# 在线考试系统接口文档

## 试题设计

### 新建试题

- URL：/examOnline/v1
- method：post
- 参数

| 字段         | 类型   | 说明     | 必需 |
| ------------ | ------ | -------- | ---- |
| type         | stirng | 试题类型 | 是   |
| tag          | string | 标签     | 否   |
| difficulty   | number | 难度     | 否   |
| score        | stirng | 试题分值 | 否   |
| questionDesc | stirng | 试题描述 | 是   |
| options      | array  | 选项     | 否   |
| answer       | string | 标准答案 | 否   |

- 返回值



- 调用示例





### 删除试题

- URL：examOnline/v1
- method：delete
- 参数

| 字段 | 类型   | 说明   | 必需 |
| ---- | ------ | ------ | ---- |
| id   | stirng | 试题id | 是   |

- 返回值



- 调用示例

### 修改试题

- URL：examOnline/v1
- method：put
- 参数

| 字段         | 类型   | 说明     | 必需 |
| ------------ | ------ | -------- | ---- |
| type         | stirng | 试题类型 | 是   |
| tag          | string | 标签     | 否   |
| difficulty   | number | 难度     | 否   |
| score        | stirng | 试题分值 | 否   |
| questionDesc | stirng | 试题描述 | 是   |
| options      | array  | 选项     | 否   |
| answer       | string | 标准答案 | 否   |

- 返回值



- 调用示例

### 获取试题

- URL：examOnline/v1
- method：get
- 参数

| 字段 | 类型   | 说明               | 必需 |
| ---- | ------ | ------------------ | ---- |
| type | string | 试题类型，默认'qa' | 否   |

- 返回值



- 调用示例





## 在线答题

### 获取试卷

- URL：/papers/v1
- method：get
- 参数

| 字段 | 类型   | 说明               | 必需 |
| ---- | ------ | ------------------ | ---- |
| type | string | 试题类型，默认'qa' | 否   |

- 返回值



- 调用示例

### 提交选择题答卷

- URL：/papers/v1
- method：post
- 参数

| 字段 | 类型               | 说明 | 必需 |
| ---- | ------------------ | ---- | ---- |
| list | array[{id,answer}] | 答卷 | 是   |

- 返回值

- 调用示例

### 提交问答题答卷

- URL：/papersQA/v1
- method：post
- 参数

| 字段 | 类型               | 说明 | 必需 |
| ---- | ------------------ | ---- | ---- |
| list | array[{id,answer}] | 答卷 | 是   |

- 返回值



- 调用示例

## 自助评分

### 获取问答题答卷

- URL：/papersQA/v1
- method：get
- 参数：无需参数

- 返回值

- 调用示例

### 评判问答题答卷

- URL：/scoreQA/v1
- method：post
- 参数

| 字段 | 类型               | 说明 | 必需 |
| ---- | ------------------ | ---- | ---- |
| list | array[{id,answer}] | 答卷 | 是   |

- 返回值



- 调用示例