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
        // console.log(name);
        
        await client.mSet([
            "user:email",
            "abc@google.com",
            "user:age",
            "22",
            "user:country",
            "India",
        ]);
        const [email , age , country]  = await client.mGet([
            "user:email",
            "user:age",
            "user:country",
        ]);

        // console.log(email , age , country);

        // lists -> LPUSH , RPUSH , LRANGE , LPOP , RPOP

        // await client.lPush('notes' , ['note 1' , 'note 2' , 'note 3'])
        // const extractAllNotes = await client.lRange('notes' , 0 , -1);

        // console.log(extractAllNotes);

        // // const firstNote = await client.lPop('notes')
        // console.log(firstNote);
         
        // // const remainingNotes = await client.lRange('notes' , 0 , -1);
        // console.log(remainingNotes , "remainingNotes");

        // sets ->  SADD , SMEMBERS , SISMEMBER , SREM
        // await client.sAdd('user:nickname' , ['john' , 'xyz' , 'varun'])
        // const extractuserNickNames = await client.sMembers('user:nickname')

        // console.log(extractuserNickNames);

        // const isVarunUserNickname = await client.sIsMember('user:nickname' , "varun")
        // console.log(isVarunUserNickname);
        
        
        // await client.sRem('user:nickname' , 'xyz');
        // const getUpdatedUserNicknames = await client.sMembers('user:nickname')
        // console.log(getUpdatedUserNicknames);
        
        // sorted sets -> each element has a score associated with it 
        // ZADD , ZRANGE , ZRANK , ZREM

        // await client.zAdd('cart' , [
        //     {
        //         score: 100 , value: 'Cart 1'
        //     },
        //     {
        //         score: 150 , value: 'Cart 2'
        //     },
        //     {
        //         score: 20 , value: 'Cart 3'
        //     }
        // ]);

        // const getTopCartItems = await client.zRange("cart" , 0 , -1);
        // console.log(getTopCartItems);

        // const extractCartItemsWithScore = await client.zRangeWithScores('cart' , 0 , -1);
        // console.log(extractCartItemsWithScore);
         
        // const cartTwoWithRank = await client.zRank('cart' , 'Cart 2');
        // console.log(cartTwoWithRank);

        // hashes -> HSET , HGET , HGETALL , HDEL

        await client.hSet('product:1' , {
            name: 'Product 1',
            description: "product one description",
            rating: 5
        })

        const getProductRating = await client.hGet('product:1' , 'rating');
        console.log(getProductRating);

        const getProductDetails = await client.hGetAll('product:1');
        console.log(getProductDetails);

        await client.hDel('product:1' , 'rating')

        const updatedProductDetails = await client.hGetAll('product:1')
        console.log(updatedProductDetails);
        
        

    } catch (e) {
        console.error(e);
    } finally {
        client.quit();
    }
}

redisDataStructures()