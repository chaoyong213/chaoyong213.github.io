---
layout: post
title: "CentOS 7 搭建kafka_2.12-2.0.0集群"
date: 2021-04-28
description: ""
tag: kafka
---

### 一、服务器集群

    kafka集群把状态保存在zookeeper中，在搭建kafka集群前先搭建zookeeper集群。
    zookeeper集群搭建可参考：https://blog.csdn.net/sealir/article/details/82696228。
    kafka集群节点：192.168.0.24，192.168.0.48，192.168.0.60

### 二、搭建kafka集群
    从官网http://kafka.apache.org/downloads下载kafka。

    在三个节点新建kafka工作目录：mkdir -p /usr/local/kafka

    将kafka解压到/usr/local/kafka：tar -zxvf kafka_2.12-2.0.0.tgz -C /usr/local/kafka

    新建kafka日志目录：mkdir -p /usr/local/kafka/kafkalogs

    配置kafka配置文件：vim /usr/local/kafka/kafka_2.12-2.0.0/config/server.properties

    server.properties配置如下：
    ```
    #broker.id=0
    host.name=<host_ip>
    log.dirs=/usr/local/kafka/kafkalogs
    message.max.byte=5242880
    default.replication.factor=2
    replica.fetch.max.bytes=5242880
    delete.topic.enable=true
    zookeeper.connect=192.168.0.24:2181,192.168.0.36:2181,192.168.0.48:2181
    ```   
    将broker.id=0注释掉，

    host.name为节点ip，

    zookeeper.connect为zookeeper集群地址。

    kafka节点默认需要的内存为1G，如果需要修改内存，可以修改kafka-server-start.sh的配置项。

    **vim /usr/local/kafka/kafka_2.12-2.0.0/bin/kafka-server-start.sh**

    找到KAFKA_HEAP_OPTS配置项，例如修改如下：

    **export KAFKA_HEAP_OPTS="-Xmx2G -Xms2G"**

    在三个节点进行以上配置，配置完成后，即可在三个节点启动kafka集群。

    分别进入三个节点的kafka工作目录：**cd /usr/local/kafka/kafka_2.12-2.0.0/**

    启动三个节点的kafka：**./bin/kafka-server-start.sh -daemon ./config/server.properties**

    启动后可以执行jps命令查看kafka是否启动，如果启动失败，可以进入logs目录，查看kafkaServer.out日志记录。

 

    kafka常用命令：

    停止kafka：./bin/kafka-server-stop.sh 

    创建topic：./bin/kafka-topics.sh --create --zookeeper 192.168.0.24:2181,192.168.0.36:2181,192.168.0.48:2181 --replication-factor 1 --partitions 1 --topic topic_name

    展示topic：./bin/kafka-topics.sh --list --zookeeper 192.168.0.24:2181,192.168.0.36:2181,192.168.0.48:2181

    描述topic：./bin/kafka-topics.sh --describe --zookeeper 192.168.0.24:2181,192.168.0.36:2181,192.168.0.48:2181 --topic topic_name

    生产者发送消息：./bin/kafka-console-producer.sh --broker-list 192.168.0.24:9092 --topic topic_name

    消费者消费消息：./bin/kafka-console-consumer.sh --zookeeper 192.168.0.24:2181,192.168.0.36:2181, 192.168.0.48:2181 --topic topic_name --from-beginnin

    删除topic：./bin/kafka-topics.sh --delete --topic topic_name --zookeeper 192.168.0.24:2181,192.168.0.36:2181, 192.168.0.48:2181

### 三、SpringBoot集成kafka
    新建maven工程kafka，在pom.xml文件中引入kafka jar包，
```
<dependency>
	<groupId>org.springframework.kafka</groupId>
	<artifactId>spring-kafka</artifactId>
	<version>2.1.10.RELEASE</version>
</dependency>
<dependency>
	<groupId>org.springframework.kafka</groupId>
	<artifactId>spring-kafka-test</artifactId>
	<version>2.1.10.RELEASE</version>
</dependency>
```
    在application.yml中配置kafka集群参数：
```
spring:
  profiles: home
  application:
    name: kafka
  kafka:
    # kafka服务器地址(可以多个)
    bootstrap-servers: 192.168.0.24:9092,192.168.0.48:9092,192.168.0.60:9092
    consumer:
      # 指定一个默认的组名
      group-id: kafka2
      # earliest:当各分区下有已提交的offset时，从提交的offset开始消费；无提交的offset时，从头开始消费
      # latest:当各分区下有已提交的offset时，从提交的offset开始消费；无提交的offset时，消费新产生的该分区下的数据
      # none:topic各分区都存在已提交的offset时，从offset后开始消费；只要有一个分区不存在已提交的offset，则抛出异常
      auto-offset-reset: earliest
      # key/value的反序列化
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
    producer:
      # key/value的序列化
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.apache.kafka.common.serialization.StringSerializer
      # 批量抓取
      batch-size: 65536
      # 缓存容量
      buffer-memory: 524288
      # 服务器地址
      bootstrap-servers: 192.168.0.24:9092,192.168.0.48:9092,192.168.0.60:9092
app:
  topic:
    common: common
```
    新建发送消息的controller：
```
@RestController
@RequestMapping(value = "kafka")
public class KafkaController {

    private static final Logger logger = LoggerFactory.getLogger(KafkaController.class);

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Value("${app.topic.common}")
    private String topic;

    @RequestMapping(value = "send", method = RequestMethod.GET)
    @ResponseBody
    public void send(String key, String data) {
        kafkaTemplate.send(topic, key, data);
    }
}
```
    新建消息监听器：
```
@Component
public class KafkaListener {

    private static final Logger logger = LoggerFactory.getLogger(KafkaListener.class);

    @org.springframework.kafka.annotation.KafkaListener(topics = "${app.topic.common}")
    public void receive(ConsumerRecord<?, ?> consumer) {
        logger.info("{} - {} : {}", consumer.topic(), consumer.key(), consumer.value());
    }
}
```
    启动程序，在浏览器中调用send接口，发送消息，观察消息监听器输出。

    如调用在浏览器中访问：http://localhost:8080/kafka/send?key=kafka&data=kafka

    在控制台中可以看到监听器的消息输出：



查看代码
