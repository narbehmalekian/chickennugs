           let posts = [];

            class Post {
                constructor(heading,text){
                    this.heading = heading;
                    this.text = text;
                    this.upVotes = 0;
                    this.downVotes = 0;
                    this.date = new Date();
                    this.id = getNewID();
                }
                upVote() {
                    this.upVotes+=1;
                }
                downVote() {
                    this.downVotes+=1;
                }
            }
            var test  = new Post("Happy birthday, my nugget!","I made this website for you so you OR ANYBODY can post whatever to this nugget page! No pictures for now, but they're coming...");
            test.upVote();
            test.upVote();
            posts.push(test);
            var test2 = new Post("second post","I made this website for you so you OR ANYBODY can post whatever to this nugget page! No pictures for now, but they're coming...");
            test2.upVote();
            posts.push(test2);
            var test3 = new Post("third test","does this work too?");
            posts.push(test3);
            var test4 = new Post("4th test","does this work too?");
            posts.push(test4);
            var test5 = new Post("5th test","kick me");
            posts.push(test5);

            function getNewID(){
                var max = 0;
                for(var i=0; i<posts.length;i++){
                    if(posts[i].id>=max){
                        max=posts[i].id+1;
                    }
                }
                return max;
            }

            function openEditor(){
                document.getElementById("new").style.display = "block";
            }
            function closeEditor(){
                document.getElementById("new").style.display = "none";
            }
            function daysBetween(a,b){
                return 20;
            }

            function clearPosts(){
                var old = document.getElementsByClassName("post");
                for(var i=old.length-1;i>-1;i--){
                    document.body.removeChild(old[i]);
                }
            }
            
            function updatePost(id){
                for(var i=0; i<posts.length;i++){
                    var post = posts[i];
                    if(post.id==id){
                        document.getElementById(id+"up").innerHTML = "👍🏼 " + post.upVotes;
                        document.getElementById(id+"down").innerHTML = "👎🏼 " + post.downVotes;
                    }
                }
            }

            function vote(id,vote){
                for(var i=0;i<posts.length;i++){
                    if(posts[i].id==id){
                        if(vote>0){
                            posts[i].upVote();
                        }
                        else if(vote<0){
                            posts[i].downVote();
                        }
                    }
                }
                updatePost(id);
            }

            function generatePosts(mode){
                clearPosts();
                if( mode === 'date' ){
                    posts.sort(function(a,b){
                        return b.date.getTime()-a.date.getTime();
                    })
                }
                else if( mode === 'rank' ){
                    posts.sort(function(a,b){
                        return b.upVotes - a.upVotes;
                    })
                }
                else if( mode === 'good' ){
                    posts.sort(function(a,b){
                        return ((b.upVotes+1)/(b.downVotes+1)) - ((a.upVotes+1)/(a.downVotes+1));
                    })
                }
                else if( mode === 'fire' ){
                    posts.sort(function(a,b){
                        return (b.upVotes+b.downVotes) - (a.upVotes+a.downVotes)
                    })
                }
                for( let i = 0; i<posts.length; i++ ){
                    var post = posts[i];
                    if( daysBetween(post.date, new Date()) > 500 ){
                        delete posts[i];
                    }
                    else {
                        var table = document.createElement('table');
                        var tr = document.createElement('tr');
                        var th = document.createElement('th');
                        th.innerHTML = post.heading;
                        th.setAttribute("colspan",2);
                        tr.appendChild(th);
                        table.appendChild(tr);

                        tr = document.createElement('tr');
                        var td = document.createElement('td');
                        td.innerHTML = post.text;
                        td.setAttribute("colspan",2);
                        tr.appendChild(td);
                        table.appendChild(tr);

                        var date = post.date;
                        tr = document.createElement('tr');
                        td = document.createElement('td');
                        var button = document.createElement('button');
                        button.innerHTML = '👍🏼 ' + post.upVotes;
                        button.setAttribute("onclick","vote(" + post.id + ", 1)");
                        button.setAttribute("id",post.id+"up");
                        td.appendChild(button);

                        button = document.createElement('button');
                        button.innerHTML = '👎🏼 ' + post.downVotes;
                        button.setAttribute("onclick","vote(" + post.id + ", -1)");
                        button.setAttribute("id",post.id+"down");
                        td.appendChild(button);

                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = date.toDateString();
                        tr.appendChild(td);
                        table.appendChild(tr);
                        table.setAttribute("class","post");
                        document.body.appendChild(table);
                    }
                }
            }

            function createPost(){
                closeEditor();
                var head = document.getElementById("heading").value;
                var text = document.getElementById("text").value;
                var post = new Post( head, text );
                posts.push(post);
                generatePosts('date');
            }