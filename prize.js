/**
 * Created by Yuanben on 2017/8/16.
 */
(function () {
    $(function () {
        var $steps=$('.step'),
            $step01=$('.step01'),
            $step02=$('.step02'),
            $step03=$('.step03');

        var prize={
            server_url:' https://lottery.yuanben.io',
            ethAddress:'',//账户地址
            prize_loading:false,//正在抽奖
            count_timer:null,//累加定时器
            tickets:0,//剩余抽奖次数
            lotteries:[],//每次抽奖结果的集合
            pst_total:0//已获得的pst总数
        };

        $('.step01-submit').on('click',function () {
            //根据eth查询抽奖次数
            prize.ethAddress=$('.eth-address').val();
            var $step01ErrorTip=$('.step01-error-tip');
            if(!prize.ethAddress){
                $step01ErrorTip.text('ETH地址错误').addClass('show');
                return;
            }
            var $subbtn=$(this);
            if(!$subbtn.hasClass('disabled')){
                $subbtn.addClass('disabled').text('查询中...')
                $.ajax({
                    method: "POST",
                    url: prize.server_url+'/address',
                    contentType:'application/json',
                    data: JSON.stringify({ address: prize.ethAddress}),
                    success:function (res) {
                        // var res={
                        //     code:200,
                        //     data:{
                        //         lotteries:[55],
                        //         tickets:11
                        //     },
                        //     message:''
                        // };
                        if(res.code==200){
                            if(res.data.lotteries.length){
                                //计算当前地址获得的pst总数
                                prize.pst_total=res.data.lotteries.reduce(function (preValue,curValue,index,array){
                                    return preValue + curValue;
                                });
                                prize.lotteries=res.data.lotteries;
                            }
                            prize.tickets=res.data.tickets;

                            if(prize.tickets<1){
                                //没有抽奖机会 或者已经抽完
                                if(prize.lotteries.length==0){
                                    $step01ErrorTip.text('该地址没有抽奖机会').addClass('show');
                                }else{
                                    $step01.hide();
                                    $step03.html(render_step03_temp(prize.lotteries)).show();
                                    //展示pst总数
                                    total_increase(prize.pst_total,$('#prize-total'));
                                }
                            }else{
                                //进入抽奖
                                $step01.hide();
                                render_step02_temp(prize.lotteries,prize.tickets);
                                $('.rule').addClass('mt80');
                                $step02.show();

                            }
                        }else{
                            layer(res.message||'网络连接失败')
                        }

                    },
                    error:function (err) {
                         layer('网络连接失败')
                    },
                    complete:function () {
                        $subbtn.removeClass('disabled').text('提交')
                    }
                })
            }

        });

        //抽奖
        $('body').on('click','.prize-btn',function () {
            if(prize.prize_loading){
                return
            }
            var $subbtn=$(this);
            if(!$subbtn.hasClass('disabled')){
                prize.prize_loading=true;
                $('.prize-result').hide();
                $('#jiang').addClass('rotate');
                $('#hongbao').show();
                var subbtn_text=$subbtn.text();
                $subbtn.addClass('disabled').text('抽奖中...');
                var prizeParams={ address: prize.ethAddress};
                if($subbtn.data('per')==10){
                    prizeParams.serial=true;
                }
                setTimeout(function () {
                    $.ajax({
                        method: "POST",
                        url: prize.server_url+'/lottery',
                        contentType:'application/json',
                        data: JSON.stringify(prizeParams),
                        success:function (res) {
                            // var res={
                            //     code:200,
                            //     data:{
                            //         currentLotteries:[1,4],
                            //         lotteries:[2,4,5],
                            //         tickets:0
                            //     },
                            //     message:""
                            // }
                            if(res.code==200){
                                if(res.data.lotteries.length){
                                    //计算当前地址获得的pst总数
                                    prize.pst_total=res.data.lotteries.reduce(function (preValue,curValue,index,array){
                                        return preValue + curValue;
                                    });
                                    prize.lotteries=res.data.lotteries;
                                }
                                prize.tickets=res.data.tickets;
                                render_lottery_temp(res.data.currentLotteries);
                                render_step02_temp(prize.lotteries,prize.tickets);
                                $('#hongbao').hide();
                                $('.prize-result').show();
                            }else{
                                layer(res.message||'网络连接失败')
                            }
                        },
                        error:function (res) {
                            layer('网络连接失败')
                        },
                        complete:function () {
                            $('#jiang').removeClass('rotate');
                            prize.prize_loading=false;
                            $subbtn.removeClass('disabled').text(subbtn_text)
                        }
                    })
                },3000)
            }
        })
        .on('click','.prize-show-all',function () {
            $('.rule').removeClass('mt80')
            $step02.hide();
            $step03.html(render_step03_temp(prize.lotteries)).show();
            //展示pst总数
            total_increase(prize.pst_total,$('#prize-total'));
        });

        //最终信息汇总也
        function render_step03_temp(lotteries) {
            var max=Math.max.apply({},lotteries)
            var temp='<div class="prize-total">'+
                '<div class="prize-total-cont">'+
                '<div class="total">'+
                '<div>— 总共获得PST —</div>'+
                '<div class="num" id="prize-total">0</div>'+
                '</div>'+
                '<div class="bot">你已用光了所有抽奖次数，共计抽了<i>'+lotteries.length+'</i>次，获得了<i>'+prize.pst_total+'</i>个PST，最好的单次手气抽到了<i>'+max+'</i>个PST！<br>'+
                '<span>本次活动的奖励最终会与大家ICO认购的代币一起发放，敬请期待哦！</span></div>'+
                '<img src="https://yb-public.oss-cn-shanghai.aliyuncs.com/primas/images/prize-icon001.png" alt=""><img src="https://yb-public.oss-cn-shanghai.aliyuncs.com/primas/images/prize-icon001.png" alt="">'+
                '</div>'+
                '</div>';
            return temp;
        }

        //当前抽奖次数及总收益展示
        function render_step02_temp(lotteries,tickets) {
            var total_chance=parseInt(lotteries.length)+parseInt(tickets);//总次数
            var chance_temp='你共有<span class="chance-total">'+total_chance+'</span>次抽奖机会！还剩<span class="chance-have" id="chance-have">'+tickets+'</span>次<span class="total-tip-with-iphone">,已抽到<span class="total-tip-iphone">'+prize.pst_total+'</span>个PST！</span>';
            var btn_temp='';
            if(tickets<1){
                //抽到没有机会
                btn_temp='<div class="btn prize-show-all">查看总数</div>';
            }else{
                btn_temp='<div class="btn prize-btn prize-one" data-per="1">开始抽奖</div>';
                if(tickets>=10){
                    btn_temp += '<div class="btn prize-btn prize-ten" data-per="10">10次连抽</div>'
                }
            }

            $('.step02-chance').html(chance_temp);
            $('.btn-box').html(btn_temp)
            //展示pst总数
            total_increase(prize.pst_total,$('#prize-total-count'));
        }
        //每次抽奖结果展示
        function render_lottery_temp(currentLotteries) {
            var temp='';
            currentLotteries.forEach(function (v) {
                temp+='<div class="item">恭喜你，抽到'+v+'个PST</div>'
            })
            $('.prize-result').html(temp)
        }

        //动态累加 ---totalPst:当前获得的pst总数
        function total_increase(totalPst,$target){
            prize.count_timer=setInterval(function () {
                var cur=+$target.text();
                if(cur>=totalPst){
                    $target.text(totalPst);
                    clearInterval(prize.count_timer)
                }else{
                    cur++
                    $target.text(cur)
                }
            },10)
        }

        //弹窗
        function layer(text) {
            var $div=document.createElement("div");
            $div.className='toast-wrap'
            $div.innerHTML=text;
            document.body.appendChild($div);
            setTimeout(function () {
                document.body.removeChild($div);
            },4000)
        };
    });


})();
