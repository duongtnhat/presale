

export default function Top() {
  return (<div className="flex flex-col rounded-[20px] shadow-[inset_0_0_32px_0_#FFFFFF26] p-3 cursor-pointer relative"
       style={{width: "45%", height: "100%"}}>
      <div style={{width: "100%", height: "100%"}}>
          <h5 className="ant-typography uppercase text-xl font-bold">LEADERBOARD</h5>
          <div className="dashLead_list">
              <div className="dashLead_motion">
                  <div className="dashLead_left">
                      <img alt="Whale" loading="lazy" width="33" height="33" decoding="async"
                           data-nimg="1" className="rankImg" src="/images/whale.svg"
                           style={{color: "transparent"}} />
                      <div className="dashLead_rank">1</div>
                      <div>
                          <p>0x2222...5c1</p>
                          <h5>JPO</h5>
                      </div>
                  </div>
                  <div className="dashLead_right">
                      <h5>Total Transactions</h5>
                      <p>$2,991.64</p>
                  </div>
              </div>
              <div className="dashLead_motion">
                  <div className="dashLead_left">
                      <img alt="Whale" loading="lazy" width="33" height="33" decoding="async"
                           data-nimg="1" className="rankImg" src="/images/whale.svg"
                           style={{color: "transparent"}} />
                      <div className="dashLead_rank">2</div>
                      <div>
                          <p>0x578e...ea4</p>
                          <h5>JPO</h5>
                      </div>
                  </div>
                  <div className="dashLead_right">
                      <h5>Total Transactions</h5>
                      <p>$2,324.25</p>
                  </div>
              </div>
              <div className="dashLead_motion">
                  <div className="dashLead_left">
                      <img alt="Whale" loading="lazy" width="33" height="33" decoding="async"
                           data-nimg="1" className="rankImg" src="/images/whale.svg"
                           style={{color: "transparent"}} />
                      <div className="dashLead_rank">3</div>
                      <div>
                          <p>0x4e5a...b57</p>
                          <h5>JPO</h5>
                      </div>
                  </div>
                  <div className="dashLead_right">
                      <h5>Total Transactions</h5>
                      <p>$1,555.42</p>
                  </div>
              </div>
              <div className="dashLead_motion">
                  <div className="dashLead_left">
                      <img alt="Whale" loading="lazy" width="33" height="33" decoding="async"
                           data-nimg="1" className="rankImg" src="/images/whale.svg"
                           style={{color: "transparent"}} />
                      <div className="dashLead_rank">4</div>
                      <div>
                          <p>0x815b...652</p>
                          <h5>JPO</h5>
                      </div>
                  </div>
                  <div className="dashLead_right">
                      <h5>Total Transactions</h5>
                      <p>$1,231.12</p>
                  </div>
              </div>
              <div className="dashLead_motion">
                  <div className="dashLead_left">
                      <img alt="Whale" loading="lazy" width="33" height="33" decoding="async"
                           data-nimg="1" className="rankImg" src="/images/whale.svg"
                           style={{color: "transparent"}} />
                      <div className="dashLead_rank">5</div>
                      <div>
                          <p>0x0c13...bd6</p>
                          <h5>JPO</h5>
                      </div>
                  </div>
                  <div className="dashLead_right">
                      <h5>Total Transactions</h5>
                      <p>$1,175.78</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
