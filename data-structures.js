import redis from 'redis';

const client = redis.createClient({
    host: 'localhost',
    port: 6379
})

// event listeners
client.on('error' , (error) => 
    console.log('Redis client error occured!' , error)
);

async function redisDataStructures(){
    try {
        await client.connect();
        // Strings -> SET , GET , MSET , MGET

        await client.set("user:name" , "Aryan Roy");
        const name = await client.get("user:name")
        console.log(name);
        
        await client.mSet(["user:email" , "abc@google.com" , "user:age" , "22" , "user:country" , "India"])
        const [email , age , country]  = await client.mGet([
            "user:email",
            "user:age",
            "user:country",
        ]);

        console.log(email , age , country);
        

    } catch (e) {
        console.error(e);
    } finally {
        client.quit();
    }
}

redisDataStructures()