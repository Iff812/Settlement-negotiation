# MongoDB Replica Set Setup Guide

This guide will walk you through the steps to set up a MongoDB replica set on your local machine. Setting up a replica set is essential for enabling features like change streams, which require MongoDB to be in a replica set configuration.

## Step 1: Stop MongoDB Instance

If MongoDB is already running, stop the MongoDB instance.

```bash
brew services stop mongodb-community
```

## Step 2: Modify MongoDB Configuration

Edit the MongoDB configuration file (mongod.conf) and add the following configuration to enable replication:

```bash
replication:
  replSetName: "rs0"
```

Locate mongod.conf
You can find the mongod.conf file typically in one of these locations:

/usr/local/etc/mongod.conf
/etc/mongod.conf
MAC - /opt/homebrew/etc/mongod.conf
Use a text editor to modify the file:

```bash
sudo nano /usr/local/etc/mongod.conf
```

## Step 3: Start MongoDB Instance with Replica Set Configuration

Start MongoDB with the modified configuration file.

```bash
brew services start mongodb-community
```

## Step 4: Initialize the Replica Set

Connect to MongoDB using the mongo shell and initialize the replica set.

```bash
mongo
```

In the MongoDB shell, run the following command to initialize the replica set:

```bash
rs.initiate()
```

## Step 5: Verify Replica Set Configuration

After initializing the replica set, you can verify the configuration by running the following command in the MongoDB shell:


```bash
rs.status()
```


## Step 6: Restart MongoDB Instance

Restart MongoDB to ensure all changes are applied.

```bash
brew services restart mongodb-community
```
