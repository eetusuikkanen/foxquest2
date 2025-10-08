//=============================================================================
// FC_DontTrimMV - .js
//=============================================================================

/*:
 * @plugindesc Prevent the battle background from being cropped, regardless of whether it is front or side view.
 * @author Koji Marumugi
 *
 * @help This plugin does not provide plugin commands.
 * 
 *  [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @plugindesc フロントビュー、サイドビューに関わらず、戦闘背景がトリミングされないようにします。
 * @author Koji Marumugi
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * 
 *  ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(()=>{
    'use strict';

    var _spriteset_Battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
    Spriteset_Battle.prototype.createBattleback = function() {
            
        var ret =  _spriteset_Battle_createBattleback.apply(this, arguments); 
       
        var x = -this._battleField.x;
        var y = -this._battleField.y;
        var width = Graphics.width * 2;
        var height = Graphics.height * 2;
        this._back1Sprite = new TilingSprite();
        this._back2Sprite = new TilingSprite();
        this._back1Sprite.bitmap = this.battleback1Bitmap();
        this._back2Sprite.bitmap = this.battleback2Bitmap();
        this._back1Sprite.move(x, y, width, height);
        this._back2Sprite.move(x, y, width, height);
        this._battleField.addChild(this._back1Sprite);
        this._battleField.addChild(this._back2Sprite);

        return ret;
        
     };

    var _spriteset_Battle_locateBattleback = Spriteset_Battle.prototype.locateBattleback;
    Spriteset_Battle.prototype.locateBattleback = function() {
            
        _spriteset_Battle_locateBattleback.apply(this, arguments); 

        var sprite1 = this._back1Sprite;
        var sprite2 = this._back2Sprite;
        if ($gameSystem.isSideView()) {
            sprite1.origin.y = 0;
            sprite2.origin.y = 0;
        }
        
     };

})();