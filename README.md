## UDID
A web game  to reduce the pressure.
一個生產者跟消除者 PK 的遊戲

## Game Role

1. 玩家兩人。
2. 當玩家一進入畫面時，先決定自己暱稱，決定好自己暱稱後按下送出，即出現 `ready` 鈕。
3. 當玩家兩人都按下 `ready` 鈕，遊戲倒數 5 秒開始，遊戲開始進行。 
4. 初始場景：
   * 4 X 20 ( 4 列 20 行 )
   * 單字輸入框，送出按鈕
   * 記分板
5. 遊戲開始，電腦會從字庫中挑出 200 個不重覆的單字，派給玩家一人各 100 個單字。
6. 推送字庫會從最上方開始往下推，一次推一列，一列 4 個單字，每 3 秒推一次；100 個單字所推送完時間會耗時 75 秒。
7. 玩家可在輸入框輸入單字，按下送出，當輸入單字與己方電腦所推送下來的單字相同時，即變成對方字庫，且馬上推送到對方畫面，加在推送的最底下一排。
8. 當玩家消掉己方單字，單字消失，但佔的單格格子仍然還在。
9. 當玩家消掉相同一列的的 4 個單字，整列消失，佔的空間消失，此列下面的列會往上回推一列。
9. 遊戲時間 90 秒。
10. 當玩家成功消掉對方玩家所送過來之單字，此單字消失，不會再變成對方字庫。
11. 在 75 秒過後，如果己方畫面已清空，馬上勝出，跳結束畫面。
12. 在 90 秒過後，如果兩方玩家都還有單字未清，時間中止，跳結束畫面。
13. 結束畫面：
    * 每消掉一個單字獲得 100 分。
    * 分數較高玩家秀出相對應畫面。
    * 分數較低玩家秀出相對應畫面。