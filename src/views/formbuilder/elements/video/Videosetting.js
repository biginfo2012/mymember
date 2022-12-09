import React from 'react'
import { Select, Input } from 'antd'
import { Typography } from '@mui/material';
import { useState } from 'react';

const { Option } = Select;

const Videosetting = ({ editor }) => {
  const [videoType, setVideoType] = useState("Custom Embed")

  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };

  return (
    <div id="video">
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='inputlablewarrper mb-0'
          >Video Type</Typography>
        </div>
        <Select
          className='inputstyle'
          onChange={(e) => setVideoType(e)}
          defaultValue={videoType}
          getPopupContainer={() => document.getElementById('video')}>
          <Option value="Custom Embed">Custom Embed</Option>
          <Option value="Youtube">Youtube</Option>
          <Option value="Vimeo">Vimeo</Option>
          <Option value="Wistia">Wistia</Option>
          <Option value="EasyVideoSuite">EasyVideoSuite</Option>
          <Option value="HTML 5 video">HTML 5 video</Option>
        </Select>
      </div>
      {
        videoType === "Youtube" && <>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Youtube Url</Typography>
            </div>
            <Input
              className='inputstyle'
            />
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Auto Play</Typography>
            </div>
            <Select
              className='inputstyle'
              onChange={(e) => setVideoType(e)}
              getPopupContainer={() => document.getElementById('video')}>
              <Option value="On">On</Option>
              <Option value="of">Of</Option>
            </Select>
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Controls</Typography>
            </div>
            <Select
              className='inputstyle'
              onChange={(e) => setVideoType(e)}
              getPopupContainer={() => document.getElementById('video')}>
              <Option value="On">On</Option>
              <Option value="of">Of</Option>
            </Select>
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Brandding</Typography>
            </div>
            <Select
              className='inputstyle'
              onChange={(e) => setVideoType(e)}
              getPopupContainer={() => document.getElementById('video')}>
              <Option value="On">On</Option>
              <Option value="of">Of</Option>
            </Select>
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Block pause</Typography>
            </div>
            <Select
              className='inputstyle'
              onChange={(e) => setVideoType(e)}
              getPopupContainer={() => document.getElementById('video')}>
              <Option value="no">No</Option>
              <Option value="yes">Yes</Option>
            </Select>
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Unmute Label</Typography>
            </div>
            <Select
              className='inputstyle'
              onChange={(e) => setVideoType(e)}
              getPopupContainer={() => document.getElementById('video')}>
              <Option value="no">No</Option>
              <Option value="yes">Yes</Option>
            </Select>
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Optinal Widht</Typography>
            </div>
            <Input
              className='inputstyle'
            />
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Optinal Height</Typography>
            </div>
            <Input
              className='inputstyle'
            />
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Optinal Widht</Typography>
            </div>
            <Input
              className='inputstyle'
            />
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Overlay Text</Typography>
            </div>
            <Input className='inputstyle' />
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Youtube Url</Typography>
            </div>
            <Input className='inputstyle' />
          </div>
        </>
      }
      {
        videoType === "Custom Embed" && <>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Video Embed</Typography>
            </div>
            <Input
              className='inputstyle'
            />
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Overlay Text</Typography>
            </div>
            <Input className='inputstyle' />
          </div>
        </>
      }
      {
        videoType === "Vimeo" && <>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Vimeo Url</Typography>
            </div>
            <Select
              className='inputstyle'
            />
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Auto Play</Typography>
            </div>
            <Select
              className='inputstyle'
              onChange={(e) => setVideoType(e)}
              getPopupContainer={() => document.getElementById('video')}>
              <Option value="On">On</Option>
              <Option value="of">Of</Option>
            </Select>
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Block pause</Typography>
            </div>
            <Select
              className='inputstyle'
              onChange={(e) => setVideoType(e)}
              getPopupContainer={() => document.getElementById('video')}>
              <Option value="On">On</Option>
              <Option value="of">Of</Option>
            </Select>
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Unmute Label</Typography>
            </div>
            <Select
              className='inputstyle'
              onChange={(e) => setVideoType(e)}
              getPopupContainer={() => document.getElementById('video')}>
              <Option value="no">No</Option>
              <Option value="yes">Yes</Option>
            </Select>
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Optinal Widht</Typography>
            </div>
            <Input
              className='inputstyle'
            />
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Optinal Height</Typography>
            </div>
            <Input
              className='inputstyle'
            />
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Overlay Text</Typography>
            </div>
            <Input className='inputstyle' />
          </div>
        </>
      }
      {
        videoType === "Wistia" && <>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Wistia Url</Typography>
            </div>
            <Select
              className='inputstyle'
            />
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Auto Play</Typography>
            </div>
            <Select
              className='inputstyle'
              onChange={(e) => setVideoType(e)}
              getPopupContainer={() => document.getElementById('video')}>
              <Option value="On">On</Option>
              <Option value="of">Of</Option>
            </Select>
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Block pause</Typography>
            </div>
            <Select
              className='inputstyle'
              onChange={(e) => setVideoType(e)}
              getPopupContainer={() => document.getElementById('video')}>
              <Option value="On">On</Option>
              <Option value="of">Of</Option>
            </Select>
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Unmute Label</Typography>
            </div>
            <Select
              className='inputstyle'
              onChange={(e) => setVideoType(e)}
              getPopupContainer={() => document.getElementById('video')}>
              <Option value="no">No</Option>
              <Option value="yes">Yes</Option>
            </Select>
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Optinal Widht</Typography>
            </div>
            <Input
              className='inputstyle'
            />
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Optinal Height</Typography>
            </div>
            <Input
              className='inputstyle'
            />
          </div>
        </>
      }
      {
        videoType === "EasyVideoSuite" && <>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Evs Embed Code</Typography>
            </div>
            <Input
              className='inputstyle'
            />
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Overlay Text</Typography>
            </div>
            <Input className='inputstyle' />
          </div>
        </>
      }
      {
        videoType === "HTML 5 video" && <>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Mp4 url</Typography>
            </div>
            <Input
              className='inputstyle'
            />
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Wemb url</Typography>
            </div>
            <Input className='inputstyle' />
          </div>
          <div className='inputwarrper'>
            <div
              className='inputlablewarrper'>
              <Typography
                className='inputlablewarrper mb-0'
              >Start image url</Typography>
            </div>
            <Input className='inputstyle' />
          </div>
        </>
      }
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='inputlablewarrper mb-0'
          >Title</Typography>
        </div>
        <Input className='inputstyle' />
      </div>
      <div className='inputwarrper'>
        <div
          className='inputlablewarrper'>
          <Typography
            className='inputlablewarrper mb-0'
          >Border Color</Typography>
        </div>
        <Input
          type='color'
          className='inputstyle'
        />
      </div>
    </div>
  )
}

export default Videosetting